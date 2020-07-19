function MisVacantes() {
    var self = this
    let {view} = plugdo;
    this.init = () => {
        $.post("/api/empresa/getMyVacants", {}, function (data) {
            console.log(data)
        })
    }
}