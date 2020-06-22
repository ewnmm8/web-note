let memo_area = document.getElementById("memo-area")

// 勝手に読み出し
memo_area.value = localStorage.getItem("text") || ""

// 勝手に保存
memo_area.onchange = function() {
  localStorage.setItem("text", this.value)
}