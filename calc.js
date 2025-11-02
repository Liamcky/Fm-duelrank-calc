const duelConfig = {
  basePoints: 50,
  rankThresholds: {
    "99-90": "S POW",
    "89-80": "A POW",
    "79-70": "B POW",
    "69-60": "C POW",
    "59-50": "D POW",
    "49-40": "D TEC",
    "39-30": "C TEC",
    "29-20": "B TEC",
    "19-10": "A TEC",
    "09-00": "S TEC"
  },
  victoryConditions: {
    "Total Annihilation": 2,
    "Victory by Attrition": -40,
    "Exodia Win": 40
  },
  turns: {
    "00-04": 12,
    "05-08": 8,
    "09-28": 0,
    "29-32": -8,
    "33-36": -12
  },
  effectiveAttacks: {
    "00-01": 4,
    "02-03": 2,
    "04-09": 0,
    "10-19": -2,
    "20": -4
  },
  defensiveWins: {
    "00-01": 0,
    "02-05": -10,
    "06-09": -20,
    "10-14": -30,
    "15": -40
  },
  faceDownPlays: {
    "00-00": 0,
    "01-10": -2,
    "11-20": -4,
    "21-30": -6,
    "31-36": -8
  },
  initiateFusion: {
    "00-00": 4,
    "01-04": 0,
    "05-09": -4,
    "10-14": -8,
    "15": -12
  },
  equipMagic: {
    "00-00": 4,
    "01-04": 0,
    "05-09": -4,
    "10-14": -8,
    "15": -12
  },
  pureMagic: {
    "00-00": 2,
    "01-03": -4,
    "04-06": -8,
    "07-09": -12,
    "10-36": -16
  },
  triggerTrap: {
    "00-00": 2,
    "01-02": -8,
    "03-04": -16,
    "05-06": -24,
    "07-36": -32
  },
  cardsUsed: {
    "00-08": 15,
    "09-12": 12,
    "13-32": 0,
    "33-36": -5,
    "37-40": -7
  },
  remainingLP: {
    "0000-0099": -7,
    "0100-0999": -5,
    "1000-6999": 0,
    "7000-7999": 4,
    "8000": 6
  }
};

//Berechnung des Gesamtscores
function calculateDuelScore(stats) {
  let score = duelConfig.basePoints;
  score += duelConfig.victoryConditions[stats.victoryCondition] || 0;
  score += duelConfig.turns[stats.turns] || 0;
  score += duelConfig.effectiveAttacks[stats.effectiveAttacks] || 0;
  score += duelConfig.defensiveWins[stats.defensiveWins] || 0;
  score += duelConfig.faceDownPlays[stats.faceDownPlays] || 0;
  score += duelConfig.initiateFusion[stats.initiateFusion] || 0;
  score += duelConfig.equipMagic[stats.equipMagic] || 0;
  score += duelConfig.pureMagic[stats.pureMagic] || 0;
  score += duelConfig.triggerTrap[stats.triggerTrap] || 0;
  score += duelConfig.cardsUsed[stats.cardsUsed] || 0;
  score += duelConfig.remainingLP[stats.remainingLP] || 0;

  //Begrenzung auf 0–99
  score = Math.max(0, Math.min(99, score));

  //Rang ausgeben
  let rank = "Unknown";
  for (const [range, name] of Object.entries(duelConfig.rankThresholds)) {
    const [min, max] = range.split('-').map(n => parseInt(n, 10));
    if (score <= min && score >= max) {
      rank = name;
      break;
    }
  }

  return { score, rank };
}

const form = document.getElementById("duelForm");
const result = document.getElementById("result");
    form.addEventListener("input", () => {
      const stats = {
        victoryCondition: form.victoryCondition.value,
        turns: form.turns.value,
        effectiveAttacks: form.effectiveAttacks.value,
        defensiveWins: form.defensiveWins.value,
        faceDownPlays: form.faceDownPlays.value,
        initiateFusion: form.initiateFusion.value,
        equipMagic: form.equipMagic.value,
        pureMagic: form.pureMagic.value,
        triggerTrap: form.triggerTrap.value,
        cardsUsed: form.cardsUsed.value,
        remainingLP: form.remainingLP.value
      };
      const { score, rank } = calculateDuelScore(stats);
      result.textContent = `Ergebnis: ${score} Punkte und Rang: ${rank}`;
    });

    form.dispatchEvent(new Event("input"));
    
