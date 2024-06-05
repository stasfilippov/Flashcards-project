export function formatDateToDdMmYY(dateString: string) {
  const date = new Date(dateString)

  // Получаем день, месяц и год
  const day = String(date.getDate()).padStart(2, '0') // День месяца с ведущим нулём
  const month = String(date.getMonth() + 1).padStart(2, '0') // Месяц с ведущим нулём (месяцы начинаются с 0)
  const year = String(date.getFullYear()).slice(-2) // Последние две цифры года

  // Форматируем дату в формате dd.mm.yy
  return `${day}.${month}.${year}`
}
