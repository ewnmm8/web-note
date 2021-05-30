const blackword = ["_____", "_moved", "_tab_now", "_tab_list"]

// 旧仕様から移行
if (localStorage.getItem("_moved") === null) {
  localStorage.setItem("_____", localStorage.getItem("text"))
  localStorage.removeItem("text")
  localStorage.setItem("_moved", "moved")
}

// 汎用関数
const save = function () {
  localStorage.setItem(_tab_now, memo_area.value)
  localStorage.setItem("_tab_now", _tab_now)
  localStorage.setItem("_tab_list", _tab_list.join(','))
}
const newOption = function (op_name) {
  const option = document.createElement("option")
  option.innerHTML = op_name
  select.appendChild(option)
}

// 変数初期化
const memo_area = document.getElementById("memo-area")
const select = document.getElementById("tab")
let _tab_now = localStorage.getItem("_tab_now") || "_____"
let _tab_list = localStorage.getItem("_tab_list") || "_____"
_tab_list = _tab_list.split(',') //配列化
const text_add = document.getElementById("text_add")
text_add.value = ""

// タブのプルダウンを初期化
for (const tab_name of _tab_list) {
  if (tab_name == "_____") continue
  newOption(tab_name)
}

// 画面初期化
select.value = _tab_now
memo_area.value = localStorage.getItem(_tab_now) || ""
save()


///////////////////////////////////////////////////////////////////


// 書き込まれたとき
memo_area.onchange = save

// タブ変更時
select.onchange = function () {
  _tab_now = select.value
  memo_area.value = localStorage.getItem(_tab_now) || ""
  save()
}

// タブ追加
document.getElementById("button_add").onclick = function () {
  if (blackword.includes(text_add.value)) {
    alert("使用できないワードです。")
    return false
  }
  if (_tab_list.includes(text_add.value)) {
    alert("重複しています。")
    return false
  }
  if (text_add.value == "") return false
  newOption(text_add.value)
  _tab_list.push(text_add.value)
  _tab_now = text_add.value
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
  if (_tab_now == "_____") {
    if (confirm("「デフォルト」タブをリセットします。よろしいですか？")) {
      memo_area.value = ""
    }
    return false
  }
  if (!confirm(`「${_tab_now}」タブを削除します。よろしいですか？`)) {
    return false
  }
  else {
    const index = _tab_list.indexOf(_tab_now)
    localStorage.removeItem(_tab_now)
    _tab_list.splice(index, 1)
    select.removeChild(select.getElementsByTagName("option")[index])
    _tab_now = select.value
    memo_area.value = localStorage.getItem(_tab_now) || ""
  }
  save()
}


///////////////////////////////////////////////////////////////////


// メニュー画面を出す
document.getElementById("memo-area-div").onclick = function (e) {
  if (!e.target.isEqualNode(e.currentTarget)) return false
  $("#another-page").fadeTo("slow", 1)
}

// メニューを閉じる
document.getElementById("another-page-flex").onclick = function (e) {
  if (!e.target.isEqualNode(e.currentTarget)) return false
  $("#another-page").fadeOut("slow")
}