let content = []
let currentPage = 1
let maxPage = 1

window.addEventListener("click", function (event) {
  const obj2 = document.getElementById("obj2")
  const currentElement = event.target
  const id = currentElement.getAttribute("id")
  if (id && id.toLowerCase() == "option") obj2.classList.add("slideout")
  else {
    if (!obj2.contains(currentElement) && obj2.classList.contains("slideout")) {
      obj2.classList.add("fadeout")
      setTimeout(() => {
        obj2.classList.remove("slideout")
        obj2.classList.remove("fadeout")
      }, 1200)
    }
  }
})

function removeEmpty() {
  const quantity = document.getElementById("quantity")
  quantity.classList.toggle("empty", !quantity.value)
}

function initialize() {
  content = []
  currentPage = 1
  const quantity = document.getElementById("quantity").value
  const type = document.getElementById("dropdown").value
  if (!type) return
  if (!quantity || isNaN(quantity)) {
    document.getElementById("quantity").classList.add("empty")
    return
  } else {
    maxPage = Math.ceil(quantity / 3)
    document.getElementById("items").classList.remove("initial")
    for (let i = 0; i < quantity; i++) {
      content.push(`${type}${i + 1}`)
    }
    populatePage()
  }
}

function populatePage() {
  let start = (currentPage - 1) * 3
  let page = content.slice(start, start + 3)
  let pageContent = ""
  const leftElement = document.getElementById('left')
  const rightElement = document.getElementById('right')
  for (let i = 0; i < page.length; i++) {
    pageContent +=
      `
    <div class="item">
      <div class="index">${start + i + 1}</div>
      <div class="content">Item ${page[i]}</div>
      <div class="index invisible">${start + i + 1}</div>
    </div>
    `
  }
  document.getElementById("items").innerHTML = pageContent

  // Disable pagination links when necessary
  rightElement.classList.toggle('disabled', currentPage + 1 > maxPage)
  leftElement.classList.toggle('disabled', currentPage - 1 < 1)
}

function leftPagination() {
  if (currentPage === 1) {
    alert("You're on the first page. You can't go backward any further.")
    return
  } else {
    currentPage -= 1
    populatePage()
  }
}

function rightPagination() {
  if (currentPage + 1 > maxPage) {
    alert("You're on the last page. You can't go forward any further.")
    return
  } else {
    currentPage += 1
    populatePage()
  }
}
