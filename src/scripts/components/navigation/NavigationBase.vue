
// Javascript
<script>
import { mapState } from 'vuex';

export default {
  name: 'NavigationBase',
  data () {},
  computed: {
     ...mapState({
        linkLists: state => state.dto.linkLists
      }),
  },
  props: {},
  methods: {
    getLinkListByHandle(handle){
      let linkLists = [];
      this.linkLists.forEach(element => {
        if(element.name == handle){
          linkLists = element
        }
      });
      return linkLists;
    }
  },
  created() {

  },
};
</script>

