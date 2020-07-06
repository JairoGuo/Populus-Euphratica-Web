const changePage = {

    data() {
        return {
            page: 1,
            end: false,
            top: true,
            next: null,
            previous: null,

        }
    },

    methods: {
        changePage(flag) {
            if (flag) {
                this.page += 1
                this.changePageCallback()

            } else {
                this.page -= 1
                this.changePageCallback()


            }
        },
        changePageCallback() {

        }

    },



}

export default changePage
