addLayer("ET", {
      name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
      symbol: "ETH", // This appears on the layer's node. Default is the id with the first letter capitalized
      position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
      startData() {
        return {
          unlocked: true,
          points: new Decimal(0),
          best: new Decimal(0),
          
          d1am: new Decimal(0)
          }
      },
      color: "#3C47BC",
      row: 1, // Row the layer is in on the tree (0 is the first row)
      branches: ["ST"],
      layerShown() { return player.ST.points.gte(1.18e38) || player.ET.best.gte(1) },
      tabFormat: {
        "Main": {
          content: [
        ['raw-html', () => {
             return `You have ${format(player.ET.points, 0)} ETHEREUM `
        }]],
        },
      },
      })