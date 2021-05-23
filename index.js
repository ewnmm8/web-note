const blackword = ["_____", "_moved", "tab_now", "tab_list"]

// 旧仕様から移行
if (localStorage.getItem("_moved") === null) {
  localStorage.setItem("_____", localStorage.getItem("text"))
  localStorage.removeItem("text")
  localStorage.setItem("_moved", "moved")
}

// 汎用関数
const save = function () {
  localStorage.setItem(tab_now, memo_area.value)
  localStorage.setItem("tab_now", tab_now)
  localStorage.setItem("tab_list", tab_list.join(','))
}
const newOption = function (op_name) {
  const option = document.createElement("option")
  option.innerHTML = op_name
  select.appendChild(option)
}

// 変数初期化
const memo_area = document.getElementById("memo-area")
const select = document.getElementById("tab")
let tab_now = localStorage.getItem("tab_now") || "_____"
let tab_list = localStorage.getItem("tab_list") || "_____"
tab_list = tab_list.split(',') //配列化
const text_add = document.getElementById("text_add")
text_add.value = ""

// タブのプルダウンを初期化
for (const tab_name of tab_list) {
  if (tab_name == "_____") continue
  newOption(tab_name)
}

// 画面初期化
select.value = tab_now
memo_area.value = localStorage.getItem(tab_now) || ""
save()


///////////////////////////////////////////////////////////////////


// 書き込まれたとき
memo_area.onchange = save

// タブ変更時
select.onchange = function () {
  tab_now = select.value
  memo_area.value = localStorage.getItem(tab_now) || ""
  save()
}

// タブ追加
document.getElementById("button_add").onclick = function () {
  if (blackword.includes(text_add.value)) {
    alert("使用できないワードです。")
    return false
  }
  if (tab_list.includes(text_add.value)) {
    alert("重複しています。")
    return false
  }
  if (text_add.value == "") return false
  newOption(text_add.value)
  tab_list.push(text_add.value)
  tab_now = text_add.value
  select.value = text_add.value
  text_add.value = ""
  memo_area.value = ""
  save()
}
// テキスト入力後のエンターキーでタブ追加
text_add.onkeypress = function (e) {
  const key = e.keyCode || e.charCode || 0
  if (key == 13) document.getElementById("button_add").onclick()
}

// タブ削除
document.getElementById("button_delete").onclick = function () {
  if (!confirm("このタブを削除します。よろしいですか？")) {
    return false
  }
  if (tab_now == "_____") {
    memo_area.value = ""
  }
  else {
    const index = tab_list.indexOf(tab_now)
    localStorage.removeItem(tab_now)
    tab_list.splice(index, 1)
    select.removeChild(select.getElementsByTagName("option")[index])
    tab_now = select.value
    memo_area.value = localStorage.getItem(tab_now) || ""
  }
  save()
}