export function convertDurationToTimeString(duration: number) {
    const hours = Math.floor(duration / 3600)
    //quantos seg sobram da divisão acima? dps divide por 60 pra obter os mins
    const minutes = Math.floor((duration % 3600) / 60)
    const seconds = duration % 60

    //padStart força ter 2 caracteres, se tiver só 1 coloca o zero na frente
    const timeString = [hours, minutes, seconds]
        .map(unit => String(unit).padStart(2, '0'))
        .join(':')

    return timeString
}