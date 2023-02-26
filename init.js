// Alias
const ls_g = (key) => localStorage.getItem(key)
const ls_s = (key, value) => {localStorage.setItem(key, value)}
const jsong = () => JSON.parse(localStorage.getItem("data"))
const jsons = object => {localStorage.setItem("data", JSON.stringify(object))}
const select = document.getElementsByTagName("select")[0]
const textarea = document.getElementsByTagName("textarea")[0]

function make_option (value) {
    const option = document.createElement("option")
    option.innerHTML = value
    option.value = value
    return option
}

function init () {
    // 初回や破損時の内部データ初期化
    if (ls_g("selected") === null || ls_g("data") === null || ls_g("data") == "{}") {
        localStorage.clear()
        ls_s("selected", "デフォルト")
        ls_s("data", '{"デフォルト":""}')
    }

    // タブリスト設定
    select.innerHTML = ""
    for (let key in jsong()) {
        let option = make_option(key)
        if (ls_g("selected") == key) option.selected = true
        select.appendChild(option)
    }

    select.dispatchEvent(new Event("change"))
}

// ページのロード時に初期化を実行
window.addEventListener("load", init)


// 保存
textarea.addEventListener("blur", function () {
    const obj = jsong()
    obj[ls_g("selected")] = this.value
    jsons(obj)
})