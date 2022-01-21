<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  mounted () {
    this.renderChart([1,2,3])
  }
}
</script>