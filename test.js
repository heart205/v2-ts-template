var fs = require('fs')

fs.readFile(process.cwd() + '/src/components/highLightCode.vue', 'utf8', function (err, data) {
  if (err) return

  console.log(JSON.stringify(data, null, 2))
})
