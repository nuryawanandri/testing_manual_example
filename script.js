const jsonUrl = "http://jsonplaceholder.typicode.com/comments"
const dataPerpage = 20
let onPage = 1
let dataComment = []
let sortOrder = 'ascending'
let filter = 'postId'

// getData(jsonUrl, filter)
function getData (jsonUrl, field) {
  fetch(jsonUrl)
    .then(response => response.json())
    .then(json => {
      dataComment = json
      sortingData(json, field)
      showPagination(json)
    })
    .catch((err) => alert(err))
}

function toJson (data) {
  return data.json()
}

function showPagination (totalData) {
  let paginationElem = document.getElementById('pagination')
  paginationElem.innerHTML = ""
  let totalPage = Math.ceil(searchData(totalData).length/dataPerpage)

  for (let i = 1; i <= totalPage; i++) {
    let buttonPage = document.createElement('button')
    buttonPage.textContent = i
    buttonPage.onclick = changePage(i)
    if (onPage === i) {
      buttonPage.disabled = true
      buttonPage.className = "page-active"
    }
    paginationElem.appendChild(buttonPage)
  }
}

function changePage (page) {
  return () => {
    onPage = page
    // getData(jsonUrl, 'name')
    sortingData(dataComment, filter)
    showPagination(dataComment)
  }
}

function changeFilter () {
  let selectElem = document.getElementById('filter-option')
  // getData(jsonUrl, selectElem.value.toLowerCase())
  filter = selectElem.value
  sortingData(dataComment, filter)
  showPagination(dataComment)
}

function changeSortOrder () {
  let sortorderElem = document.getElementById('sort-order')

  sortOrder = sortorderElem.value
  sortingData(dataComment, filter)
  showPagination(dataComment)
}

function sortingData (dataJson, filter) {
  // let data = dataJson

  let data = searchData(dataJson)
  data.sort((a, b) => {
    let dataA = a[filter]
    let dataB = b[filter]
    if (dataA < dataB) {
      return -1
    }
    if (dataA > dataB) {
      return 1
    }

    return 0;
  })
  if (sortOrder === 'descending') {
    data = data.reverse()
  }
  return showData(data)
}

function searchData (dataJson) {
  let dataSearch = Object.assign([], dataJson)
  let keySearchElem = documentWithProxy.getElementById('search-key')

  dataSearch = dataSearch.filter((data) => {
    return data.body.toLowerCase().includes(keySearchElem.value.toLowerCase())
  })

  return dataSearch
}

function onChangeSearchKey () {
  sortingData(dataComment, filter)
  showPagination(dataComment)
}

function showData (dataJson) {
  let containerElem = document.getElementById('container')
  containerElem.innerHTML = ""

  let maxDataShow = dataPerpage*onPage

  for (let i = maxDataShow-dataPerpage; i < maxDataShow; i++) {
    if (dataJson[i] !== undefined) {
      let contentElem = document.createElement('div')
      contentElem.className = "content"

      let fieldPostIdELem = document.createElement('div')
      let fieldIdElem = document.createElement('div')
      let fieldNameELem = document.createElement('div')
      let fieldEmailELem = document.createElement('div')
      let fieldBodyELem = document.createElement('div')

      let textPostID = document.createElement('span')
      textPostID.textContent = `Post Id : ${dataJson[i].postId}`
      fieldPostIdELem.appendChild(textPostID)

      let textId = document.createElement('span')
      textId.textContent = `Id : ${dataJson[i].id}`
      fieldIdElem.appendChild(textId)

      let textName = document.createElement('span')
      textName.textContent = `Name : ${dataJson[i].name}`
      fieldNameELem.appendChild(textName)

      let textEmail = document.createElement('span')
      textEmail.textContent = `Email : ${dataJson[i].email}`
      fieldEmailELem.appendChild(textEmail)

      let textBody = document.createElement('span')
      textBody.textContent = `Body : ${dataJson[i].body}`
      fieldBodyELem.appendChild(textBody)

      contentElem.appendChild(fieldPostIdELem)
      contentElem.appendChild(fieldIdElem)
      contentElem.appendChild(fieldNameELem)
      contentElem.appendChild(fieldEmailELem)
      contentElem.appendChild(fieldBodyELem)

      containerElem.appendChild(contentElem)
    }
  }
}

// TESTING 
