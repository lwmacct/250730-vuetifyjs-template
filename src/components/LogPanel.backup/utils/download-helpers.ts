/**
 * 文件下载工具函数
 */

/**
 * 下载文本文件
 * @param content - 文件内容
 * @param filename - 文件名
 * @param mimeType - MIME类型
 */
export function downloadTextFile(
  content: string,
  filename: string,
  mimeType: string = 'text/plain',
): void {
  const blob = new Blob([content], { type: mimeType + ';charset=utf-8' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.style.display = 'none'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  // 清理URL对象
  URL.revokeObjectURL(url)
}

/**
 * 下载JSON文件
 * @param data - 数据对象
 * @param filename - 文件名
 */
export function downloadJsonFile(data: any, filename: string): void {
  const content = JSON.stringify(data, null, 2)
  downloadTextFile(content, filename, 'application/json')
}

/**
 * 下载CSV文件
 * @param content - CSV内容
 * @param filename - 文件名
 */
export function downloadCsvFile(content: string, filename: string): void {
  downloadTextFile(content, filename, 'text/csv')
}

/**
 * 生成带时间戳的文件名
 * @param baseName - 基础文件名
 * @param extension - 文件扩展名
 */
export function generateTimestampedFilename(baseName: string, extension: string): string {
  const timestamp = new Date()
    .toISOString()
    .replace(/[:.]/g, '-')
    .replace('T', '_')
    .substring(0, 19) // 移除毫秒和时区信息

  return `${baseName}_${timestamp}.${extension}`
}

/**
 * 复制文本到剪贴板
 * @param text - 要复制的文本
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // 回退方案：使用传统的复制方法
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-9999px'
      textArea.style.top = '-9999px'

      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()

      const successful = document.execCommand('copy')
      document.body.removeChild(textArea)

      return successful
    }
  } catch (error) {
    console.error('复制到剪贴板失败:', error)
    return false
  }
}

/**
 * 格式化文件大小
 * @param bytes - 字节数
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
