function toGermanNote(noteStr) {
    if (!noteStr) return "";
    let match = noteStr.match(/([A-G])([#b]?)([0-9])/);
    if (!match) return noteStr;
    let pitch = match[1];
    let acc = match[2];

    let germPitch = pitch;
    if (pitch === 'B') {
        if (acc === 'b') germPitch = 'B';
        else if (acc === '') germPitch = 'H';
    } else if (pitch === 'E' && acc === 'b') {
        germPitch = 'Es';
    } else if (pitch === 'A' && acc === 'b') {
        germPitch = 'As';
    } else if (pitch === 'D' && acc === 'b') {
        germPitch = 'Des';
    } else if (pitch === 'G' && acc === 'b') {
        germPitch = 'Ges';
    } else if (pitch === 'C' && acc === 'b') {
        germPitch = 'Ces';
    } else if (acc === '#') {
        if (pitch === 'A') germPitch = 'Ais';
        else if (pitch === 'C') germPitch = 'Cis';
        else if (pitch === 'D') germPitch = 'Dis';
        else if (pitch === 'F') germPitch = 'Fis';
        else if (pitch === 'G') germPitch = 'Gis';
    }
    return germPitch;
}

function getRoleClass(role) {
    if (role === 'root') return 'role-root';
    if (role === 'third') return 'role-third';
    if (role === 'fifth') return 'role-fifth';
    if (role === 'seventh') return 'role-seventh';
    if (role === 'empty') return 'role-empty';
    return '';
}

function getCentsText(role, mode, chordName) {
    if (role === 'root') return '±0¢';
    if (role === 'third') {
        if (mode === 'kanon' && (chordName === 'VIm' || chordName === 'IIIm' || chordName === 'IVm')) {
            return '+16¢';
        }
        if (mode === 'moll' && (chordName === 'I' || chordName === 'IV')) {
            return '+16¢';
        }
        return '-14¢';
    }
    if (role === 'fifth') return '+2¢';
    if (role === 'seventh') return '-31¢';
    return '';
}

const cycleKeys = ["C", "F", "Bb", "Eb", "Ab", "Db", "Gb", "B", "E", "A", "D", "G"];
const cycleKeysGerman = {
    "C": "C / c", "F": "F / f", "Bb": "B / b", "Eb": "Es / es",
    "Ab": "As / as", "Db": "Des / des", "Gb": "Ges / ges", "B": "H / h",
    "E": "E / e", "A": "A / a", "D": "D / d", "G": "G / g"
};

const scalesGerman = {
    "C":  { name: "C-dur",  scale: ["C", "D", "E", "F", "G", "A", "H"] },
    "F":  { name: "F-dur",  scale: ["F", "G", "A", "B", "C", "D", "E"] },
    "Bb": { name: "B-dur",  scale: ["B", "C", "D", "Es", "F", "G", "A"] },
    "Eb": { name: "Es-dur", scale: ["Es", "F", "G", "As", "B", "C", "D"] },
    "Ab": { name: "As-dur", scale: ["As", "B", "C", "Des", "Es", "F", "G"] },
    "Db": { name: "Des-dur", scale: ["Des", "Es", "F", "Ges", "As", "B", "C"] },
    "Gb": { name: "Ges-dur", scale: ["Ges", "As", "B", "Ces", "Des", "Es", "F"] },
    "B":  { name: "H-dur",  scale: ["H", "Cis", "Dis", "E", "Fis", "Gis", "Ais"] },
    "E":  { name: "E-dur",  scale: ["E", "Fis", "Gis", "A", "H", "Cis", "Dis"] },
    "A":  { name: "A-dur",  scale: ["A", "H", "Cis", "D", "E", "Fis", "Gis"] },
    "D":  { name: "D-dur",  scale: ["D", "E", "Fis", "G", "A", "H", "Cis"] },
    "G":  { name: "G-dur",  scale: ["G", "A", "H", "C", "D", "E", "Fis"] }
};

const dataDur = {
    "C": { name: "C-dur", chords: [
        { name: "I", voices: [{role:"root", note:"C3"}, {role:"third", note:"E3"}, {role:"fifth", note:"G3"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"F3"}, {role:"third", note:"A3"}, {role:"fifth", note:"C4"}, {role:"empty", note:""}] },
        { name: "V7", voices: [{role:"root", note:"G3"}, {role:"third", note:"B3"}, {role:"fifth", note:"D4"}, {role:"seventh", note:"F4"}] },
        { name: "I", voices: [{role:"root", note:"C3"}, {role:"third", note:"E3"}, {role:"fifth", note:"G3"}, {role:"empty", note:""}] }
    ]},
    "F": { name: "F-dur", chords: [
        { name: "I", voices: [{role:"root", note:"F3"}, {role:"third", note:"A3"}, {role:"fifth", note:"C4"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"Bb3"}, {role:"third", note:"D4"}, {role:"fifth", note:"F4"}, {role:"empty", note:""}] },
        { name: "V7", voices: [{role:"root", note:"C3"}, {role:"third", note:"E3"}, {role:"fifth", note:"G3"}, {role:"seventh", note:"Bb3"}] },
        { name: "I", voices: [{role:"root", note:"F3"}, {role:"third", note:"A3"}, {role:"fifth", note:"C4"}, {role:"empty", note:""}] }
    ]},
    "Bb": { name: "B-dur", chords: [
        { name: "I", voices: [{role:"root", note:"Bb2"}, {role:"third", note:"D3"}, {role:"fifth", note:"F3"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"Eb3"}, {role:"third", note:"G3"}, {role:"fifth", note:"Bb3"}, {role:"empty", note:""}] },
        { name: "V7", voices: [{role:"root", note:"F3"}, {role:"third", note:"A3"}, {role:"fifth", note:"C4"}, {role:"seventh", note:"Eb4"}] },
        { name: "I", voices: [{role:"root", note:"Bb2"}, {role:"third", note:"D3"}, {role:"fifth", note:"F3"}, {role:"empty", note:""}] }
    ]},
    "Eb": { name: "Es-dur", chords: [
        { name: "I", voices: [{role:"root", note:"Eb3"}, {role:"third", note:"G3"}, {role:"fifth", note:"Bb3"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"Ab3"}, {role:"third", note:"C4"}, {role:"fifth", note:"Eb4"}, {role:"empty", note:""}] },
        { name: "V7", voices: [{role:"root", note:"Bb2"}, {role:"third", note:"D3"}, {role:"fifth", note:"F3"}, {role:"seventh", note:"Ab3"}] },
        { name: "I", voices: [{role:"root", note:"Eb3"}, {role:"third", note:"G3"}, {role:"fifth", note:"Bb3"}, {role:"empty", note:""}] }
    ]},
    "Ab": { name: "As-dur", chords: [
        { name: "I", voices: [{role:"root", note:"Ab3"}, {role:"third", note:"C4"}, {role:"fifth", note:"Eb4"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"Db3"}, {role:"third", note:"F3"}, {role:"fifth", note:"Ab3"}, {role:"empty", note:""}] },
        { name: "V7", voices: [{role:"root", note:"Eb3"}, {role:"third", note:"G3"}, {role:"fifth", note:"Bb3"}, {role:"seventh", note:"Db4"}] },
        { name: "I", voices: [{role:"root", note:"Ab3"}, {role:"third", note:"C4"}, {role:"fifth", note:"Eb4"}, {role:"empty", note:""}] }
    ]},
    "Db": { name: "Des-dur", chords: [
        { name: "I", voices: [{role:"root", note:"Db3"}, {role:"third", note:"F3"}, {role:"fifth", note:"Ab3"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"Gb3"}, {role:"third", note:"Bb3"}, {role:"fifth", note:"Db4"}, {role:"empty", note:""}] },
        { name: "V7", voices: [{role:"root", note:"Ab3"}, {role:"third", note:"C4"}, {role:"fifth", note:"Eb4"}, {role:"seventh", note:"Gb4"}] },
        { name: "I", voices: [{role:"root", note:"Db3"}, {role:"third", note:"F3"}, {role:"fifth", note:"Ab3"}, {role:"empty", note:""}] }
    ]},
    "Gb": { name: "Ges-dur", chords: [
        { name: "I", voices: [{role:"root", note:"Gb3"}, {role:"third", note:"Bb3"}, {role:"fifth", note:"Db4"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"Cb3"}, {role:"third", note:"Eb4"}, {role:"fifth", note:"Gb4"}, {role:"empty", note:""}] },
        { name: "V7", voices: [{role:"root", note:"Db3"}, {role:"third", note:"F3"}, {role:"fifth", note:"Ab3"}, {role:"seventh", note:"Cb4"}] },
        { name: "I", voices: [{role:"root", note:"Gb3"}, {role:"third", note:"Bb3"}, {role:"fifth", note:"Db4"}, {role:"empty", note:""}] }
    ]},
    "B": { name: "H-dur", chords: [
        { name: "I", voices: [{role:"root", note:"B2"}, {role:"third", note:"D#3"}, {role:"fifth", note:"F#3"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"E3"}, {role:"third", note:"G#3"}, {role:"fifth", note:"B3"}, {role:"empty", note:""}] },
        { name: "V7", voices: [{role:"root", note:"F#3"}, {role:"third", note:"A#3"}, {role:"fifth", note:"C#4"}, {role:"seventh", note:"E4"}] },
        { name: "I", voices: [{role:"root", note:"B2"}, {role:"third", note:"D#3"}, {role:"fifth", note:"F#3"}, {role:"empty", note:""}] }
    ]},
    "E": { name: "E-dur", chords: [
        { name: "I", voices: [{role:"root", note:"E3"}, {role:"third", note:"G#3"}, {role:"fifth", note:"B3"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"A3"}, {role:"third", note:"C#4"}, {role:"fifth", note:"E4"}, {role:"empty", note:""}] },
        { name: "V7", voices: [{role:"root", note:"B2"}, {role:"third", note:"D#3"}, {role:"fifth", note:"F#3"}, {role:"seventh", note:"A3"}] },
        { name: "I", voices: [{role:"root", note:"E3"}, {role:"third", note:"G#3"}, {role:"fifth", note:"B3"}, {role:"empty", note:""}] }
    ]},
    "A": { name: "A-dur", chords: [
        { name: "I", voices: [{role:"root", note:"A2"}, {role:"third", note:"C#3"}, {role:"fifth", note:"E3"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"D3"}, {role:"third", note:"F#3"}, {role:"fifth", note:"A3"}, {role:"empty", note:""}] },
        { name: "V7", voices: [{role:"root", note:"E3"}, {role:"third", note:"G#3"}, {role:"fifth", note:"B3"}, {role:"seventh", note:"D4"}] },
        { name: "I", voices: [{role:"root", note:"A2"}, {role:"third", note:"C#3"}, {role:"fifth", note:"E3"}, {role:"empty", note:""}] }
    ]},
    "D": { name: "D-dur", chords: [
        { name: "I", voices: [{role:"root", note:"D3"}, {role:"third", note:"F#3"}, {role:"fifth", note:"A3"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"G3"}, {role:"third", note:"B3"}, {role:"fifth", note:"D4"}, {role:"empty", note:""}] },
        { name: "V7", voices: [{role:"root", note:"A2"}, {role:"third", note:"C#3"}, {role:"fifth", note:"E3"}, {role:"seventh", note:"G3"}] },
        { name: "I", voices: [{role:"root", note:"D3"}, {role:"third", note:"F#3"}, {role:"fifth", note:"A3"}, {role:"empty", note:""}] }
    ]},
    "G": { name: "G-dur", chords: [
        { name: "I", voices: [{role:"root", note:"G2"}, {role:"third", note:"B2"}, {role:"fifth", note:"D3"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"C3"}, {role:"third", note:"E3"}, {role:"fifth", note:"G3"}, {role:"empty", note:""}] },
        { name: "V7", voices: [{role:"root", note:"D3"}, {role:"third", note:"F#3"}, {role:"fifth", note:"A3"}, {role:"seventh", note:"C4"}] },
        { name: "I", voices: [{role:"root", note:"G2"}, {role:"third", note:"B2"}, {role:"fifth", note:"D3"}, {role:"empty", note:""}] }
    ]}
};

const dataMoll = {
    "C": { name: "c-moll", chords: [
        { name: "I", voices: [{role:"root", note:"C3"}, {role:"third", note:"Eb3"}, {role:"fifth", note:"G3"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"F3"}, {role:"third", note:"Ab3"}, {role:"fifth", note:"C4"}, {role:"empty", note:""}] },
        { name: "V7", voices: [{role:"root", note:"G3"}, {role:"third", note:"B3"}, {role:"fifth", note:"D4"}, {role:"seventh", note:"F4"}] },
        { name: "I", voices: [{role:"root", note:"C3"}, {role:"third", note:"Eb3"}, {role:"fifth", note:"G3"}, {role:"empty", note:""}] }
    ]},
    "F": { name: "f-moll", chords: [
        { name: "I", voices: [{role:"root", note:"F3"}, {role:"third", note:"Ab3"}, {role:"fifth", note:"C4"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"Bb2"}, {role:"third", note:"Db3"}, {role:"fifth", note:"F3"}, {role:"empty", note:""}] },
        { name: "V7", voices: [{role:"root", note:"C3"}, {role:"third", note:"E3"}, {role:"fifth", note:"G3"}, {role:"seventh", note:"Bb3"}] },
        { name: "I", voices: [{role:"root", note:"F3"}, {role:"third", note:"Ab3"}, {role:"fifth", note:"C4"}, {role:"empty", note:""}] }
    ]},
    "Bb": { name: "b-moll", chords: [
        { name: "I", voices: [{role:"root", note:"Bb2"}, {role:"third", note:"Db3"}, {role:"fifth", note:"F3"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"Eb3"}, {role:"third", note:"Gb3"}, {role:"fifth", note:"Bb3"}, {role:"empty", note:""}] },
        { name: "V7", voices: [{role:"root", note:"F3"}, {role:"third", note:"A3"}, {role:"fifth", note:"C4"}, {role:"seventh", note:"Eb4"}] },
        { name: "I", voices: [{role:"root", note:"Bb2"}, {role:"third", note:"Db3"}, {role:"fifth", note:"F3"}, {role:"empty", note:""}] }
    ]},
    "Eb": { name: "es-moll", chords: [
        { name: "I", voices: [{role:"root", note:"Eb3"}, {role:"third", note:"Gb3"}, {role:"fifth", note:"Bb3"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"Ab3"}, {role:"third", note:"Cb4"}, {role:"fifth", note:"Eb4"}, {role:"empty", note:""}] },
        { name: "V7", voices: [{role:"root", note:"Bb2"}, {role:"third", note:"D3"}, {role:"fifth", note:"F3"}, {role:"seventh", note:"Ab3"}] },
        { name: "I", voices: [{role:"root", note:"Eb3"}, {role:"third", note:"Gb3"}, {role:"fifth", note:"Bb3"}, {role:"empty", note:""}] }
    ]},
    "Ab": { name: "as-moll", chords: [
        { name: "I", voices: [{role:"root", note:"Ab3"}, {role:"third", note:"Cb4"}, {role:"fifth", note:"Eb4"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"Db3"}, {role:"third", note:"Fb3"}, {role:"fifth", note:"Ab3"}, {role:"empty", note:""}] },
        { name: "V7", voices: [{role:"root", note:"Eb3"}, {role:"third", note:"G3"}, {role:"fifth", note:"Bb3"}, {role:"seventh", note:"Db4"}] },
        { name: "I", voices: [{role:"root", note:"Ab3"}, {role:"third", note:"Cb4"}, {role:"fifth", note:"Eb4"}, {role:"empty", note:""}] }
    ]},
    "Db": { name: "des-moll", chords: [
        { name: "I", voices: [{role:"root", note:"Db3"}, {role:"third", note:"Fb3"}, {role:"fifth", note:"Ab3"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"Gb3"}, {role:"third", note:"Bbb3"}, {role:"fifth", note:"Db4"}, {role:"empty", note:""}] },
        { name: "V7", voices: [{role:"root", note:"Ab3"}, {role:"third", note:"C4"}, {role:"fifth", note:"Eb4"}, {role:"seventh", note:"Gb4"}] },
        { name: "I", voices: [{role:"root", note:"Db3"}, {role:"third", note:"Fb3"}, {role:"fifth", note:"Ab3"}, {role:"empty", note:""}] }
    ]},
    "Gb": { name: "ges-moll", chords: [
        { name: "I", voices: [{role:"root", note:"Gb3"}, {role:"third", note:"Bbb3"}, {role:"fifth", note:"Db4"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"Cb3"}, {role:"third", note:"Ebb4"}, {role:"fifth", note:"Gb4"}, {role:"empty", note:""}] },
        { name: "V7", voices: [{role:"root", note:"Db3"}, {role:"third", note:"F3"}, {role:"fifth", note:"Ab3"}, {role:"seventh", note:"Cb4"}] },
        { name: "I", voices: [{role:"root", note:"Gb3"}, {role:"third", note:"Bbb3"}, {role:"fifth", note:"Db4"}, {role:"empty", note:""}] }
    ]},
    "B": { name: "h-moll", chords: [
        { name: "I", voices: [{role:"root", note:"B2"}, {role:"third", note:"D3"}, {role:"fifth", note:"F#3"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"E3"}, {role:"third", note:"G3"}, {role:"fifth", note:"B3"}, {role:"empty", note:""}] },
        { name: "V7", voices: [{role:"root", note:"F#3"}, {role:"third", note:"A#3"}, {role:"fifth", note:"C#4"}, {role:"seventh", note:"E4"}] },
        { name: "I", voices: [{role:"root", note:"B2"}, {role:"third", note:"D3"}, {role:"fifth", note:"F#3"}, {role:"empty", note:""}] }
    ]},
    "E": { name: "e-moll", chords: [
        { name: "I", voices: [{role:"root", note:"E3"}, {role:"third", note:"G3"}, {role:"fifth", note:"B3"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"A3"}, {role:"third", note:"C4"}, {role:"fifth", note:"E4"}, {role:"empty", note:""}] },
        { name: "V7", voices: [{role:"root", note:"B2"}, {role:"third", note:"D#3"}, {role:"fifth", note:"F#3"}, {role:"seventh", note:"A3"}] },
        { name: "I", voices: [{role:"root", note:"E3"}, {role:"third", note:"G3"}, {role:"fifth", note:"B3"}, {role:"empty", note:""}] }
    ]},
    "A": { name: "a-moll", chords: [
        { name: "I", voices: [{role:"root", note:"A2"}, {role:"third", note:"C3"}, {role:"fifth", note:"E3"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"D3"}, {role:"third", note:"F3"}, {role:"fifth", note:"A3"}, {role:"empty", note:""}] },
        { name: "V7", voices: [{role:"root", note:"E3"}, {role:"third", note:"G#3"}, {role:"fifth", note:"B3"}, {role:"seventh", note:"D4"}] },
        { name: "I", voices: [{role:"root", note:"A2"}, {role:"third", note:"C3"}, {role:"fifth", note:"E3"}, {role:"empty", note:""}] }
    ]},
    "D": { name: "d-moll", chords: [
        { name: "I", voices: [{role:"root", note:"D3"}, {role:"third", note:"F3"}, {role:"fifth", note:"A3"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"G3"}, {role:"third", note:"Bb3"}, {role:"fifth", note:"D4"}, {role:"empty", note:""}] },
        { name: "V7", voices: [{role:"root", note:"A2"}, {role:"third", note:"C#3"}, {role:"fifth", note:"E3"}, {role:"seventh", note:"G3"}] },
        { name: "I", voices: [{role:"root", note:"D3"}, {role:"third", note:"F3"}, {role:"fifth", note:"A3"}, {role:"empty", note:""}] }
    ]},
    "G": { name: "g-moll", chords: [
        { name: "I", voices: [{role:"root", note:"G2"}, {role:"third", note:"Bb2"}, {role:"fifth", note:"D3"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"C3"}, {role:"third", note:"Eb3"}, {role:"fifth", note:"G3"}, {role:"empty", note:""}] },
        { name: "V7", voices: [{role:"root", note:"D3"}, {role:"third", note:"F#3"}, {role:"fifth", note:"A3"}, {role:"seventh", note:"C4"}] },
        { name: "I", voices: [{role:"root", note:"G2"}, {role:"third", note:"Bb2"}, {role:"fifth", note:"D3"}, {role:"empty", note:""}] }
    ]}
};

const dataKanon = {
    "C": { name: "C-dur (カノン)", chords: [
        { name: "I", voices: [{role:"root", note:"C3"}, {role:"third", note:"E3"}, {role:"fifth", note:"G3"}, {role:"empty", note:""}] },
        { name: "V", voices: [{role:"root", note:"G3"}, {role:"third", note:"B3"}, {role:"fifth", note:"D4"}, {role:"empty", note:""}] },
        { name: "VIm", voices: [{role:"root", note:"A3"}, {role:"third", note:"C4"}, {role:"fifth", note:"E4"}, {role:"empty", note:""}] },
        { name: "IIIm", voices: [{role:"root", note:"E3"}, {role:"third", note:"G3"}, {role:"fifth", note:"B3"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"F3"}, {role:"third", note:"A3"}, {role:"fifth", note:"C4"}, {role:"empty", note:""}] },
        { name: "I", voices: [{role:"root", note:"C3"}, {role:"third", note:"E3"}, {role:"fifth", note:"G3"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"F3"}, {role:"third", note:"A3"}, {role:"fifth", note:"C4"}, {role:"empty", note:""}] },
        { name: "V", voices: [{role:"root", note:"G3"}, {role:"third", note:"B3"}, {role:"fifth", note:"D4"}, {role:"empty", note:""}] }
    ]},
    "F": { name: "F-dur (カノン)", chords: [
        { name: "I", voices: [{role:"root", note:"F3"}, {role:"third", note:"A3"}, {role:"fifth", note:"C4"}, {role:"empty", note:""}] },
        { name: "V", voices: [{role:"root", note:"C3"}, {role:"third", note:"E3"}, {role:"fifth", note:"G3"}, {role:"empty", note:""}] },
        { name: "VIm", voices: [{role:"root", note:"D3"}, {role:"third", note:"F3"}, {role:"fifth", note:"A3"}, {role:"empty", note:""}] },
        { name: "IIIm", voices: [{role:"root", note:"A3"}, {role:"third", note:"C4"}, {role:"fifth", note:"E4"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"Bb3"}, {role:"third", note:"D4"}, {role:"fifth", note:"F4"}, {role:"empty", note:""}] },
        { name: "I", voices: [{role:"root", note:"F3"}, {role:"third", note:"A3"}, {role:"fifth", note:"C4"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"Bb3"}, {role:"third", note:"D4"}, {role:"fifth", note:"F4"}, {role:"empty", note:""}] },
        { name: "V", voices: [{role:"root", note:"C3"}, {role:"third", note:"E3"}, {role:"fifth", note:"G3"}, {role:"empty", note:""}] }
    ]},
    "Bb": { name: "B-dur (カノン)", chords: [
        { name: "I", voices: [{role:"root", note:"Bb2"}, {role:"third", note:"D3"}, {role:"fifth", note:"F3"}, {role:"empty", note:""}] },
        { name: "V", voices: [{role:"root", note:"F3"}, {role:"third", note:"A3"}, {role:"fifth", note:"C4"}, {role:"empty", note:""}] },
        { name: "VIm", voices: [{role:"root", note:"G3"}, {role:"third", note:"Bb3"}, {role:"fifth", note:"D4"}, {role:"empty", note:""}] },
        { name: "IIIm", voices: [{role:"root", note:"D3"}, {role:"third", note:"F3"}, {role:"fifth", note:"A3"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"Eb3"}, {role:"third", note:"G3"}, {role:"fifth", note:"Bb3"}, {role:"empty", note:""}] },
        { name: "I", voices: [{role:"root", note:"Bb2"}, {role:"third", note:"D3"}, {role:"fifth", note:"F3"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"Eb3"}, {role:"third", note:"G3"}, {role:"fifth", note:"Bb3"}, {role:"empty", note:""}] },
        { name: "V", voices: [{role:"root", note:"F3"}, {role:"third", note:"A3"}, {role:"fifth", note:"C4"}, {role:"empty", note:""}] }
    ]},
    "Eb": { name: "Es-dur (カノン)", chords: [
        { name: "I", voices: [{role:"root", note:"Eb3"}, {role:"third", note:"G3"}, {role:"fifth", note:"Bb3"}, {role:"empty", note:""}] },
        { name: "V", voices: [{role:"root", note:"Bb2"}, {role:"third", note:"D3"}, {role:"fifth", note:"F3"}, {role:"empty", note:""}] },
        { name: "VIm", voices: [{role:"root", note:"C4"}, {role:"third", note:"Eb4"}, {role:"fifth", note:"G4"}, {role:"empty", note:""}] },
        { name: "IIIm", voices: [{role:"root", note:"G3"}, {role:"third", note:"Bb3"}, {role:"fifth", note:"D4"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"Ab3"}, {role:"third", note:"C4"}, {role:"fifth", note:"Eb4"}, {role:"empty", note:""}] },
        { name: "I", voices: [{role:"root", note:"Eb3"}, {role:"third", note:"G3"}, {role:"fifth", note:"Bb3"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"Ab3"}, {role:"third", note:"C4"}, {role:"fifth", note:"Eb4"}, {role:"empty", note:""}] },
        { name: "V", voices: [{role:"root", note:"Bb2"}, {role:"third", note:"D3"}, {role:"fifth", note:"F3"}, {role:"empty", note:""}] }
    ]},
    "Ab": { name: "As-dur (カノン)", chords: [
        { name: "I", voices: [{role:"root", note:"Ab3"}, {role:"third", note:"C4"}, {role:"fifth", note:"Eb4"}, {role:"empty", note:""}] },
        { name: "V", voices: [{role:"root", note:"Eb3"}, {role:"third", note:"G3"}, {role:"fifth", note:"Bb3"}, {role:"empty", note:""}] },
        { name: "VIm", voices: [{role:"root", note:"F3"}, {role:"third", note:"Ab3"}, {role:"fifth", note:"C4"}, {role:"empty", note:""}] },
        { name: "IIIm", voices: [{role:"root", note:"C4"}, {role:"third", note:"Eb4"}, {role:"fifth", note:"G4"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"Db3"}, {role:"third", note:"F3"}, {role:"fifth", note:"Ab3"}, {role:"empty", note:""}] },
        { name: "I", voices: [{role:"root", note:"Ab3"}, {role:"third", note:"C4"}, {role:"fifth", note:"Eb4"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"Db3"}, {role:"third", note:"F3"}, {role:"fifth", note:"Ab3"}, {role:"empty", note:""}] },
        { name: "V", voices: [{role:"root", note:"Eb3"}, {role:"third", note:"G3"}, {role:"fifth", note:"Bb3"}, {role:"empty", note:""}] }
    ]},
    "Db": { name: "Des-dur (カノン)", chords: [
        { name: "I", voices: [{role:"root", note:"Db3"}, {role:"third", note:"F3"}, {role:"fifth", note:"Ab3"}, {role:"empty", note:""}] },
        { name: "V", voices: [{role:"root", note:"Ab3"}, {role:"third", note:"C4"}, {role:"fifth", note:"Eb4"}, {role:"empty", note:""}] },
        { name: "VIm", voices: [{role:"root", note:"Bb3"}, {role:"third", note:"Db4"}, {role:"fifth", note:"F4"}, {role:"empty", note:""}] },
        { name: "IIIm", voices: [{role:"root", note:"F3"}, {role:"third", note:"Ab3"}, {role:"fifth", note:"C4"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"Gb3"}, {role:"third", note:"Bb3"}, {role:"fifth", note:"Db4"}, {role:"empty", note:""}] },
        { name: "I", voices: [{role:"root", note:"Db3"}, {role:"third", note:"F3"}, {role:"fifth", note:"Ab3"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"Gb3"}, {role:"third", note:"Bb3"}, {role:"fifth", note:"Db4"}, {role:"empty", note:""}] },
        { name: "V", voices: [{role:"root", note:"Ab3"}, {role:"third", note:"C4"}, {role:"fifth", note:"Eb4"}, {role:"empty", note:""}] }
    ]},
    "Gb": { name: "Ges-dur (カノン)", chords: [
        { name: "I", voices: [{role:"root", note:"Gb3"}, {role:"third", note:"Bb3"}, {role:"fifth", note:"Db4"}, {role:"empty", note:""}] },
        { name: "V", voices: [{role:"root", note:"Db3"}, {role:"third", note:"F3"}, {role:"fifth", note:"Ab3"}, {role:"empty", note:""}] },
        { name: "VIm", voices: [{role:"root", note:"Eb4"}, {role:"third", note:"Gb4"}, {role:"fifth", note:"Bb4"}, {role:"empty", note:""}] },
        { name: "IIIm", voices: [{role:"root", note:"Bb3"}, {role:"third", note:"Db4"}, {role:"fifth", note:"F4"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"Cb3"}, {role:"third", note:"Eb4"}, {role:"fifth", note:"Gb4"}, {role:"empty", note:""}] },
        { name: "I", voices: [{role:"root", note:"Gb3"}, {role:"third", note:"Bb3"}, {role:"fifth", note:"Db4"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"Cb3"}, {role:"third", note:"Eb4"}, {role:"fifth", note:"Gb4"}, {role:"empty", note:""}] },
        { name: "V", voices: [{role:"root", note:"Db3"}, {role:"third", note:"F3"}, {role:"fifth", note:"Ab3"}, {role:"empty", note:""}] }
    ]},
    "B": { name: "H-dur (カノン)", chords: [
        { name: "I", voices: [{role:"root", note:"B2"}, {role:"third", note:"D#3"}, {role:"fifth", note:"F#3"}, {role:"empty", note:""}] },
        { name: "V", voices: [{role:"root", note:"F#3"}, {role:"third", note:"A#3"}, {role:"fifth", note:"C#4"}, {role:"empty", note:""}] },
        { name: "VIm", voices: [{role:"root", note:"G#3"}, {role:"third", note:"B3"}, {role:"fifth", note:"D#4"}, {role:"empty", note:""}] },
        { name: "IIIm", voices: [{role:"root", note:"D#3"}, {role:"third", note:"F#3"}, {role:"fifth", note:"A#3"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"E3"}, {role:"third", note:"G#3"}, {role:"fifth", note:"B3"}, {role:"empty", note:""}] },
        { name: "I", voices: [{role:"root", note:"B2"}, {role:"third", note:"D#3"}, {role:"fifth", note:"F#3"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"E3"}, {role:"third", note:"G#3"}, {role:"fifth", note:"B3"}, {role:"empty", note:""}] },
        { name: "V", voices: [{role:"root", note:"F#3"}, {role:"third", note:"A#3"}, {role:"fifth", note:"C#4"}, {role:"empty", note:""}] }
    ]},
    "E": { name: "E-dur (カノン)", chords: [
        { name: "I", voices: [{role:"root", note:"E3"}, {role:"third", note:"G#3"}, {role:"fifth", note:"B3"}, {role:"empty", note:""}] },
        { name: "V", voices: [{role:"root", note:"B2"}, {role:"third", note:"D#3"}, {role:"fifth", note:"F#3"}, {role:"empty", note:""}] },
        { name: "VIm", voices: [{role:"root", note:"C#4"}, {role:"third", note:"E4"}, {role:"fifth", note:"G#4"}, {role:"empty", note:""}] },
        { name: "IIIm", voices: [{role:"root", note:"G#3"}, {role:"third", note:"B3"}, {role:"fifth", note:"D#4"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"A3"}, {role:"third", note:"C#4"}, {role:"fifth", note:"E4"}, {role:"empty", note:""}] },
        { name: "I", voices: [{role:"root", note:"E3"}, {role:"third", note:"G#3"}, {role:"fifth", note:"B3"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"A3"}, {role:"third", note:"C#4"}, {role:"fifth", note:"E4"}, {role:"empty", note:""}] },
        { name: "V", voices: [{role:"root", note:"B2"}, {role:"third", note:"D#3"}, {role:"fifth", note:"F#3"}, {role:"empty", note:""}] }
    ]},
    "A": { name: "A-dur (カノン)", chords: [
        { name: "I", voices: [{role:"root", note:"A2"}, {role:"third", note:"C#3"}, {role:"fifth", note:"E3"}, {role:"empty", note:""}] },
        { name: "V", voices: [{role:"root", note:"E3"}, {role:"third", note:"G#3"}, {role:"fifth", note:"B3"}, {role:"empty", note:""}] },
        { name: "VIm", voices: [{role:"root", note:"F#3"}, {role:"third", note:"A3"}, {role:"fifth", note:"C#4"}, {role:"empty", note:""}] },
        { name: "IIIm", voices: [{role:"root", note:"C#3"}, {role:"third", note:"E3"}, {role:"fifth", note:"G#3"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"D3"}, {role:"third", note:"F#3"}, {role:"fifth", note:"A3"}, {role:"empty", note:""}] },
        { name: "I", voices: [{role:"root", note:"A2"}, {role:"third", note:"C#3"}, {role:"fifth", note:"E3"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"D3"}, {role:"third", note:"F#3"}, {role:"fifth", note:"A3"}, {role:"empty", note:""}] },
        { name: "V", voices: [{role:"root", note:"E3"}, {role:"third", note:"G#3"}, {role:"fifth", note:"B3"}, {role:"empty", note:""}] }
    ]},
    "D": { name: "D-dur (カノン)", chords: [
        { name: "I", voices: [{role:"root", note:"D3"}, {role:"third", note:"F#3"}, {role:"fifth", note:"A3"}, {role:"empty", note:""}] },
        { name: "V", voices: [{role:"root", note:"A2"}, {role:"third", note:"C#3"}, {role:"fifth", note:"E3"}, {role:"empty", note:""}] },
        { name: "VIm", voices: [{role:"root", note:"B3"}, {role:"third", note:"D4"}, {role:"fifth", note:"F#4"}, {role:"empty", note:""}] },
        { name: "IIIm", voices: [{role:"root", note:"F#3"}, {role:"third", note:"A3"}, {role:"fifth", note:"C#4"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"G3"}, {role:"third", note:"B3"}, {role:"fifth", note:"D4"}, {role:"empty", note:""}] },
        { name: "I", voices: [{role:"root", note:"D3"}, {role:"third", note:"F#3"}, {role:"fifth", note:"A3"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"G3"}, {role:"third", note:"B3"}, {role:"fifth", note:"D4"}, {role:"empty", note:""}] },
        { name: "V", voices: [{role:"root", note:"A2"}, {role:"third", note:"C#3"}, {role:"fifth", note:"E3"}, {role:"empty", note:""}] }
    ]},
    "G": { name: "G-dur (カノン)", chords: [
        { name: "I", voices: [{role:"root", note:"G2"}, {role:"third", note:"B2"}, {role:"fifth", note:"D3"}, {role:"empty", note:""}] },
        { name: "V", voices: [{role:"root", note:"D3"}, {role:"third", note:"F#3"}, {role:"fifth", note:"A3"}, {role:"empty", note:""}] },
        { name: "VIm", voices: [{role:"root", note:"E3"}, {role:"third", note:"G3"}, {role:"fifth", note:"B3"}, {role:"empty", note:""}] },
        { name: "IIIm", voices: [{role:"root", note:"B2"}, {role:"third", note:"D3"}, {role:"fifth", note:"F#3"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"C3"}, {role:"third", note:"E3"}, {role:"fifth", note:"G3"}, {role:"empty", note:""}] },
        { name: "I", voices: [{role:"root", note:"G2"}, {role:"third", note:"B2"}, {role:"fifth", note:"D3"}, {role:"empty", note:""}] },
        { name: "IV", voices: [{role:"root", note:"C3"}, {role:"third", note:"E3"}, {role:"fifth", note:"G3"}, {role:"empty", note:""}] },
        { name: "V", voices: [{role:"root", note:"D3"}, {role:"third", note:"F#3"}, {role:"fifth", note:"A3"}, {role:"empty", note:""}] }
    ]}
};

function getDataset(mode) {
    if (mode === "dur") return dataDur;
    if (mode === "moll") return dataMoll;
    if (mode === "kanon") return dataKanon;
    return dataDur;
}

function initKeySelects() {
    const randSelect = document.getElementById("randKeySelect");
    randSelect.innerHTML = "";
    cycleKeys.forEach(k => {
        let opt = document.createElement("option");
        opt.value = k;
        opt.innerText = cycleKeysGerman[k];
        if (k === "C") opt.selected = true;
        randSelect.appendChild(opt);
    });

    const visSelect = document.getElementById("visualKeySelect");
    visSelect.innerHTML = "";
    cycleKeys.forEach(k => {
        let opt = document.createElement("option");
        opt.value = k;
        opt.innerText = cycleKeysGerman[k];
        if (k === "C") opt.selected = true;
        visSelect.appendChild(opt);
    });
}

function updateVisualTable() {
    const mode = document.getElementById("visualModeSelect").value;
    const key = document.getElementById("visualKeySelect").value;
    
    const theadRow = document.getElementById("visualTableHeadRow");
    const tbody = document.getElementById("visualTableBody");
    tbody.innerHTML = "";

    if (mode === "parallel") {
        const scaleData = scalesGerman[key] || scalesGerman["C"];
        const length = 8;
        const offsets = [0, 2, 4];

        let voices = offsets.map(offset => {
            let voiceNotes = [];
            for (let i = 0; i < length; i++) {
                let idx = (offset + i) % scaleData.scale.length;
                voiceNotes.push(scaleData.scale[idx]);
            }
            return voiceNotes;
        });

        document.getElementById("visualKeyTitle").innerText = `調 : ${scaleData.name} (同時進行)`;

        theadRow.innerHTML = `<th class="role-label">声部</th>`;
        for (let i = 0; i < length; i++) {
            let th = document.createElement("th");
            th.innerText = `${i + 1}音目`;
            theadRow.appendChild(th);
        }

        const partNames = ["5度パート", "3度パート", "根音パート"];
        const roleClasses = ["role-fifth", "role-third", "role-root"];

        for (let i = 2; i >= 0; i--) {
            let tr = document.createElement("tr");

            let tdLabel = document.createElement("td");
            tdLabel.className = "role-label";
            tdLabel.innerText = partNames[i];
            tr.appendChild(tdLabel);

            for (let j = 0; j < length; j++) {
                let td = document.createElement("td");
                td.className = roleClasses[i];
                td.innerHTML = `<div>${voices[i][j]}</div>`;
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
        return;
    }

    const dataset = getDataset(mode);
    const item = dataset[key];

    document.getElementById("visualKeyTitle").innerText = `調 : ${item.name}`;

    theadRow.innerHTML = `<th class="role-label">声部</th>`;
    item.chords.forEach((chord, index) => {
        let th = document.createElement("th");
        th.innerText = `${index + 1}. ${chord.name}`;
        theadRow.appendChild(th);
    });

    const partNames = ["7音", "5音", "3音", "根音"];

    for (let i = 3; i >= 0; i--) {
        let tr = document.createElement("tr");

        let tdLabel = document.createElement("td");
        tdLabel.className = "role-label";
        tdLabel.innerText = partNames[3 - i];
        tr.appendChild(tdLabel);

        item.chords.forEach(chord => {
            let td = document.createElement("td");
            let v = chord.voices[i];
            td.className = getRoleClass(v.role);
            
            if (v.role === 'empty') {
                td.innerHTML = `<div style="color: #adb5bd;">-</div>`;
            } else {
                let germ = toGermanNote(v.note);
                let cents = getCentsText(v.role, mode, chord.name);
                // カデンツ表の各セルから「[根音]」などのロール文字表記を削除
                td.innerHTML = `<div>${germ} <span style="font-size:0.7rem; font-weight:normal;">[${cents}]</span></div>`;
            }
            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    }
}

function generateParallelPattern(selectedKey) {
    const scaleData = scalesGerman[selectedKey] || scalesGerman["C"];
    
    // スケール同時進行時は上のカード部分には何も表示せず調名のみ、下の表に一覧を表示
    document.getElementById("randomCondition").innerText = `[${scaleData.name}] スケール同時進行練習`;
    document.getElementById("voiceDisplay").innerHTML = ""; 

    document.getElementById("visualModeSelect").value = "parallel";
    document.getElementById("visualKeySelect").value = selectedKey;
    updateVisualTable();
}

function generateRandomCadenceNotes() {
    const mode = document.getElementById("randModeSelect").value;
    const selectedKey = document.getElementById("randKeySelect").value;
    const display = document.getElementById("voiceDisplay");

    document.getElementById("visualModeSelect").value = mode;
    document.getElementById("visualKeySelect").value = selectedKey;
    updateVisualTable();

    if (mode === "parallel") {
        generateParallelPattern(selectedKey);
        return;
    }

    const dataset = getDataset(mode);
    const item = dataset[selectedKey];

    document.getElementById("randomCondition").innerText = item.name;
    display.innerHTML = "";

    const roleWeights = {
        'root': 10,
        'third': 6,
        'fifth': 7,
        'seventh': 4
    };

    item.chords.forEach((chordObj, idx) => {
        let card = document.createElement("div");

        let validVoices = chordObj.voices.filter(v => v.role !== 'empty');

        let weightedList = [];
        validVoices.forEach(v => {
            let weight = roleWeights[v.role] || 1;
            for (let i = 0; i < weight; i++) {
                weightedList.push(v);
            }
        });

        if (weightedList.length === 0) {
            weightedList = validVoices;
        }

        let chosenVoice = weightedList[Math.floor(Math.random() * weightedList.length)];
        
        let actualRole = chosenVoice.role;
        let actualNote = chosenVoice.note;

        let germ = toGermanNote(actualNote);
        let cents = getCentsText(actualRole, mode, chordObj.name);

        card.className = `voice-card ${getRoleClass(actualRole)}`;
        card.innerHTML = `
            <div class="voice-part">${idx + 1}. ${chordObj.name}</div>
            <div class="voice-note">${germ} <span style="font-size:0.7rem; font-weight:normal;">[${cents}]</span></div>
        `;
        display.appendChild(card);
    });
}

function onRandSettingChange() {
    generateRandomCadenceNotes();
}

initKeySelects();
updateVisualTable();
generateRandomCadenceNotes();
