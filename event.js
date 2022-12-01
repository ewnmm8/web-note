const pulldown = new PulldownSystem($("select").get(0))
let current_tab

$(window).on("load", () => {
    for (const tab of MemoTab.get_tab_list()) {
        if (tab != "__def") pulldown.add(tab)
    }
    pulldown.node.value = localStorage.getItem("last_tab") || "__def"
    current_tab = new MemoTab(pulldown.node.value)
})

$("textarea").on("change", function () {
    current_tab.save(this.value)
})

$(pulldown.node).on("change", () => {
    current_tab = new MemoTab(pulldown.node.value)
    $("textarea").get(0).value = current_tab.load() || ""
    $("textarea").change()
})
new MutationObserver(function () {
    $(pulldown.node).change()
})
.observe(pulldown.node, {"childList": true})

$("#b_add").on("click", () => {
    const new_tab_name = $("#b_add_text").get(0).value

    if (pulldown.isBannedWord(new_tab_name)) return false;

    MemoTab.add(new_tab_name)
    pulldown.add(new_tab_name)
    $("#b_add_text").get(0).value = ""
})

$("#b_add_text").on("keydown", (e) => {
    if (e.key == "Enter") $("#b_add").click()
})

$("#b_delete").on("click", () => {
    if (current_tab.key == "__def" &&
        confirm("デフォルトの内容をリセットします。\nよろしいですか？")) {
        $("textarea").get(0).value = ""
    }
    else if (confirm(current_tab.key + "の内容を削除します。\nよろしいですか？")) {
        $("textarea").get(0).value = ""
        MemoTab.remove(current_tab.key)
        pulldown.remove(current_tab.key)
    }
})

// 画面遷移
$("main").on("click", function (e) {
    if (e.target == e.currentTarget) {
        $("aside").fadeTo("slow", 1)
    }
})

$("aside").on("click", function (e) {
    if (e.target == e.currentTarget) {
        $("aside").fadeOut("slow")
    }
})
