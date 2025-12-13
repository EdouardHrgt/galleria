export function saveStorage(key, data) {
  if (!key || !data) {
    console.error('Error saving datas in Storage')
    return
  }
  const label = key.toUpperCase()
  localStorage.setItem(label, JSON.stringify(data))
}

export function getStorage(key) {
  if (key) {
    const label = key.toUpperCase()
    return JSON.parse(localStorage.getItem(label))
  }
  console.error('Error collecting datas in Storage')
}