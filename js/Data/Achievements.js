addLayer("A", {
    name: "ACH", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    row: "side", // Row the layer is in on the tree (0 is the first row)
    achievements: {
      "ST1": {
        name: `Cmon do something`,
        tooltip() { return `Gain 15 Stellar so you can gain more` },
        done()  { return player.ST.points.gte(15)  }    
      },
      "ST2": {
        name: `Dont forget to charge dat chromebook`,
        tooltip() { return `Gain 1,500 Stellar to unlock new stuff` },
        done() { return player.ST.points.gte(1500) }
      },
      "ST3": {
        name: `Wait you are still here?`,
        tooltip() { return `Gain 1M Stellar what would equal about 1k-10k€ in real life` },
        done() { return player.ST.points.gte(1e6) }
      },
      "ST4": {
        name: `I'm once again asking you for Stellar`,
        tooltip() { return `Gain 1B Stellar what solve finacial crisis` },
        done() { return player.ST.points.gte(1e9) }
      },
      "ST5": {
        name: `Well, didnt think you would be still here`,
        tooltip() { return `Gain 1T Stellar what would equal alot in real life` },
        done() { return player.ST.points.gte(1e12) }
      },
      "ST6": {
        name: `Not after 'deez' that is...`,
        tooltip() { return `Gain 1Qa Stellar` },
        done() { return player.ST.points.gte(1e15) }
      },
      "ST7": {
        name: `Halfway there!`,
        tooltip() { return `Gain 1Qi Stellar` },
        done() { return player.ST.points.gte(1e18) }
      },
      "ST8": {
        name: `Wow thats really cool`,
        tooltip() { return `Gain 1Sp Stellar` },
        done() { return player.ST.points.gte(1e24) }
      },
      "ST9": {
        name: `A Stellar in time`,
        tooltip() { return `Gain 1No Stellar` },
        done() { return player.ST.points.gte(1e30) }
      },
      "ST10": {
        name: `Finally something new...`,
        tooltip() { return `Gain 11.8UDc Stellar` },
        done() { return player.ST.points.gte(1.18e38) }
      }
    },
    tabFormat: {
        "Main": {
          content: [
            ["row", [["achievement", "ST1"], ["achievement", "ST2"], ["achievement", "ST3"], ["achievement", "ST4"], ["achievement", "ST5"], ["achievement", "ST6"], ["achievement", "ST7"], ["achievement", "ST8"], ["achievement", "ST9"],["achievement", "ST10"]]]
        ]}},
    layerShown(){return true}
})
