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