const QUERY_PARAM_DATE = 'date'
const QUERY_PARAM_WHERE = 'where'
const QUERY_PARAM_TIME = 'time'
const QUERY_PARAM_TIME_ZONES = 'timezones'

const dateInput = document.getElementById('date')
const whereInput = document.getElementById('where')
const timeInput = document.getElementById('time')
const addTimeZoneButton = document.getElementById('add-country')
const timeZoneDiv = document.getElementById('countries')

const getTime = (timeZone) => {
  const offset = getTimezoneOffset(whereInput.value)
  const offsetSigned = offset < 0 ? offset : '+' + offset
  const date = new Date(`${dateInput.value} ${timeInput.value}${offsetSigned}`)
  return date.toLocaleString('en-GB', { timeZone }).split(' ')[1].slice(0,5)
}

const changeTimeZone = (event) => {
  const timeZone = event.target.value
  const parent = event.target.parentElement
  const [span] = parent.children

  span.id = timeZone
  span.innerText = getTime(timeZone) + ' en:'
}

const changeAllHours = () => {
  timeZoneDiv.querySelectorAll('input').forEach(element =>  changeTimeZone({target: element}))
}

const eraseTimeZone = (event) => {
  const timeZoneDiv = event.target.parentElement
  timeZoneDiv.parentElement.removeChild(timeZoneDiv)
}

const addTimeZone = (timeZone) => {
  const auxDiv = document.createElement('div')
  const id = timeZone || Math.random()
  const time = timeZone ? getTime(timeZone) : '--:--'
  auxDiv.innerHTML = `
    <div class="input-group mb-3">
      <span class="input-group-text" id="${id}">${time} en:</span>
      <input type="text" class="form-control" list="timezones-list" placeholder="Añade timezone" value="${timeZone || ''}">
      <button class="btn btn-danger" type="button">
      X
      </button>
    </div>
  `
  const [child] = auxDiv.children
  const [, timeZoneInput, eraseButton] = child.children
  timeZoneInput.addEventListener('change', changeTimeZone)
  timeZoneInput.addEventListener('change', saveTimeZones)
  eraseButton.addEventListener('click', eraseTimeZone)
  eraseButton.addEventListener('click', saveTimeZones)
  timeZoneDiv.appendChild(child)
}

const setQueryParamFromName = (queryParamName) => (event) => {
  setQueryParam(queryParamName, event.target.value)
}

const saveTimeZones = () => {
  const timeZones = Array.from(timeZoneDiv.querySelectorAll('input')).map(input => input.value)
  setQueryParamAsArray(QUERY_PARAM_TIME_ZONES, ...timeZones)
}

addTimeZoneButton.addEventListener('click', () => addTimeZone())
whereInput.addEventListener('change', changeAllHours)
timeInput.addEventListener('change', changeAllHours)

dateInput.addEventListener('change', setQueryParamFromName(QUERY_PARAM_DATE))
whereInput.addEventListener('change', setQueryParamFromName(QUERY_PARAM_WHERE))
timeInput.addEventListener('change', setQueryParamFromName(QUERY_PARAM_TIME))

const myTimeZone =  Intl.DateTimeFormat().resolvedOptions().timeZone
const [todayDate, todayTime] = new Date().toISOString().split('T')

dateInput.value = getQueryParam(QUERY_PARAM_DATE) || todayDate
whereInput.value = getQueryParam(QUERY_PARAM_WHERE) || myTimeZone
timeInput.value = getQueryParam(QUERY_PARAM_TIME) || getHH_MM(todayTime)

if(getQueryParam(QUERY_PARAM_WHERE) && !getQueryParam(QUERY_PARAM_WHERE).includes(myTimeZone)) {
  addTimeZone(myTimeZone)
}

getQueryParamAsArray(QUERY_PARAM_TIME_ZONES).forEach(addTimeZone)

