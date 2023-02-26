// タブが切り替えられた時にテキストエリアを書き換える
select.addEventListener("change", function () {
    ls_s("selected", select.options[select.selectedIndex].value)
    textarea.value = jsong()[ls_g("selected")]
})

// タブ追加ボタン
document.getElementById("tab_add").addEventListener("click", function () {
    const name = prompt("新しいタブの名前を入力してください。")
    if (name === null) return
    const obj = jsong()
    if (name in obj) {
        alert("この名前は既に使用されています。")
        this.dispatchEvent(new Event("click"))
    }
    else {
        obj[name] = ""
        jsons(obj)
        ls_s("selected", name)
        init()
    }
})

// タブ削除ボタン
document.getElementById("tab_delete").addEventListener("click", function () {
    const name = select.options[select.selectedIndex].value
    if (!confirm("このタブを削除します。この操作は元に戻せません。\nよろしいですか？")) return
    const obj = jsong()
    delete obj[name]
    jsons(obj)
    init()
})