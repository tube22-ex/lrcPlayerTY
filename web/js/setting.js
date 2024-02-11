let settings;
async function settingFileLoad(){
    settings = await eel.settingLoad()();
    let settingsAry = Object.values(settings).map(s => Number(s));
    [missVolume, clearVolume, typeVolume, videoVolume] = [...settingsAry]
    setTimeout(() => {
        [missSoundRange.value, clearSoundRange.value, typeSoundRange.value, videoSoundRange.value] = [...settingsAry]
    }, 1000);
};

function updateVolume(volume, elementId, soundType) {
    if (volume) {
        document.getElementById(elementId).textContent = volume;
        eel.py_change_volume({ volume, sound_type: soundType });
    }
}

missSoundRange.addEventListener('input', (e) => {
    missVolume = e.target.value;
    updateVolume(missVolume, 'missSoundVolumeValue', 'missVolume');
});

clearSoundRange.addEventListener('input', (e) => {
    clearVolume = e.target.value;
    updateVolume(clearVolume, 'clearSoundVolumeValue', 'clearVolume');
});

typeSoundRange.addEventListener('input', (e) => {
    typeVolume = e.target.value;
    updateVolume(typeVolume, 'typeSoundVolumeValue', 'typeVolume');
});

videoSoundRange.addEventListener('input', (e) => {
    videoVolume = e.target.value;
    updateVolume(videoVolume, 'videoSoundVolumeValue', 'videoVolume');
    player.setVolume(videoVolume);
});

settingFileLoad();
//音関係

document.getElementById('searchNumber').addEventListener('focus',()=>is_input = true)
document.getElementById('searchNumber').addEventListener('blur',()=>is_input = false)
