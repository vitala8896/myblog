const getDate = updatedAt => {
  const date = new Date(updatedAt)
  const month = date.getMonth()
  const year = date.getFullYear()
  const day = date.getDate()
  const months = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  let res = `${day} ${months[month]} ${year}`
  return res === 'NaN undefined NaN'? '. . .': res
}
export default getDate