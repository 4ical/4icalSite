const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]

const getCalURL = (deltaf, deltat) => `http://4ical.pythonanywhere.com/cal/${deltaf}/${deltat}`

const getCal = async (deltaf = 0, deltat = 30) => {
    const res = await fetch(getCalURL(deltaf, deltat))
    const json = await res.json()
    return json
}

const addEvent = ev => {
    t =  `
    <div class="card">
        <h4>${ev.summary}</h4>
        <p>
            ${ev.description}
        </p>
        ${ev.start} - ${ev.end}
    </div>
    
    `
    return t;
}

const addDayHead = (date, weekday) => {
    t = `
        <div class="day">
        <h2>${DAYS[weekday]}</h2> <span>${date.reverse().join("/")}</span>
    `
    return t;
}

const addDayFoot = () => "</div>\n<hr>\n"

const sortEvents = (ev1, ev2) => {
    if (ev1.summary.startsWith("ZOOM") && !ev2.summary.startsWith("ZOOM")) return -1
    if (ev2.summary.startsWith("ZOOM") && !ev1.summary.startsWith("ZOOM")) return  1

    if (ev1.start < ev2.start) return -1
    if (ev2.start < ev1.start) return 1
    
    return 0
}

const addDay = day => {
    t = ""
    t += addDayHead(day.date, day.weekday);
    evs = day.events.sort(sortEvents)
    evs.forEach(ev => t+= addEvent(ev))
    t += addDayFoot()
    document.querySelector(".eventos").innerHTML += t
}

const renderData = data => {
    data.forEach(e => addDay(e))
}


getCal().then(r => {
    document.querySelector(".eventos").innerHTML = ""
    renderData(r)
})

halfmoon.toggleDarkMode()