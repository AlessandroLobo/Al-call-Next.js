interface GetWeekDaysParams {
  short?: boolean
}

export function getWeekDays({ short = false }: GetWeekDaysParams = {}) {
  const formatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' })
  const currentDate = new Date()
  const currentDayOfWeek = currentDate.getUTCDay()
  const startOfWeek = new Date(
    Date.UTC(
      currentDate.getUTCFullYear(),
      currentDate.getUTCMonth(),
      currentDate.getUTCDate() -
        (currentDayOfWeek > 0 ? currentDayOfWeek - 1 : 6),
    ),
  )

  return Array.from(Array(7).keys())
    .map((day) =>
      formatter.format(
        new Date(startOfWeek.getTime() + day * 24 * 60 * 60 * 1000),
      ),
    )
    .map((weekDay) => {
      if (short) {
        return weekDay.substring(0, 3).toUpperCase()
      }

      return weekDay.substring(0, 1).toUpperCase().concat(weekDay.substring(1))
    })
}
