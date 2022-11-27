/*
localStorage key
last_tab
values
*/

class MemoTab {
    constructor(key) {
        this.key = key
    }
    static #values = JSON.parse(localStorage.getItem("values") ||
        '{"__def": ""}')

    save(value) {
        MemoTab.#values[this.key] = value
        localStorage.setItem("values", JSON.stringify(MemoTab.#values))
        localStorage.setItem("last_tab", this.key)
    }

    load() {
        return MemoTab.#values[this.key]
    }

    static get_tab_list() {
        return Object.keys(MemoTab.#values)
    }

    static add(key) {
        MemoTab.#values[key] = ""
    }

    static remove(key) {
        delete MemoTab.#values[key]
    }

    static reset() {
        localStorage.clear()
    }
}


class PulldownSystem {
    constructor(select_node) {
        this.node = select_node
    }

    isBannedWord(word) {
        let banned_list = ["__def", "デフォルト", "",]
            + Array.from(this.node.options).map(x => x.value)
        if (banned_list.includes(word)) return true;
        return false
    }

    add(name) {
        this.node.appendChild(function () {
            const option = document.createElement("option")
            option.innerHTML = name
            option.value = name
            return option
        }())
    }

    remove(tab_name) {
        $("option[value='" + tab_name + "'").remove()
    }
}