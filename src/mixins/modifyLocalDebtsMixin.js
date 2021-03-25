import { mapState } from "vuex";
export default {
    computed: {
        ...mapState(["debts"]),
    },
    methods: {
        findIndexInLocalArray(array, criteria) {
            return array.findIndex(element => {
                return element._id === criteria;
            });
        },
    }
  };