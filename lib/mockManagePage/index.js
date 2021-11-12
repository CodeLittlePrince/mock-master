new window.Vue({
  el: '#app',
  data() {
    return {
      apiTableData: [],
      shareTableData: [],
      ws: null
    }
  },
  mounted() {
    window.axios.post('/mock-switch/list')
      .then(res => {
        const { share, api } = res.data

        this.activeFirstItem(share)
        this.activeFirstItem(api)

        this.apiTableData = api
        this.shareTableData = share
      })
    
    this.initWebsocket()
  },
  methods: {
    changeHandle(row, type) {
      window.axios.post('/mock-switch', {
        type,
        key: type === 'share' ? row.name : row.url,
        value: row.status,
      }).then(() => {
        this.ws.send(JSON.stringify({
          shareTableData: this.shareTableData,
          apiTableData: this.apiTableData,
        }))
      })
    },

    activeFirstItem(data) {
      for (let i = 0, len = data.length; i < len; i++) {
        data[i].selections.forEach(item => {
          item.value = item.value.replace(/\s/g, '')
        })
        data[i].status = data[i].selections[0].value
      }
    },

    initWebsocket() {
      this.ws = new WebSocket('ws://localhost:' + window.WS_PORT)

      this.ws.addEventListener('open', () => {
        console.log('Connection opened.')
      })

      this.ws.addEventListener('message', (e) => {
        const data = JSON.parse(e.data)
        const { shareTableData, apiTableData } = data

        if (shareTableData) {
          this.shareTableData = shareTableData
        }
        if (apiTableData) {
          this.apiTableData = apiTableData
        }
      })

      this.ws.addEventListener('close', () => {
        console.log('Connection closed.')
        setTimeout(() => {
          location.reload()
        }, 1000)
      })
    }
  }
})