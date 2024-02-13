import eel, re, json
from pathlib import Path

setting_json_path = r'setting.json'
def matrgeData():
    data_dict = {}
    path = Path(r'data\song')
    dir_g = path.iterdir()
    target_pattern = re.compile(r'\d+_youtubeURL.txt')#コンパイル
    for x in dir_g:
        file_name = x.name
        if target_pattern.match(file_name):
            start_index =  file_name.find('_youtubeURL.txt')
            c_id = file_name[0:start_index]
            content = ""
            with open(path / file_name , 'r',encoding='utf-8') as f:
                content = f.read()
            data_dict[c_id] = content
    global YTURL_dict
    YTURL_dict = data_dict.copy()
matrgeData()

@eel.expose
def fileReturn():
    path = Path(r'data\song')
    dir_g = path.iterdir()
    paths = [str(x.name) for x in dir_g]
    print("取得完了")
    return paths,YTURL_dict

@eel.expose
def fileSearch(n):
    path = Path(r'data\song')
    dir_g = path.iterdir()
    paths = [str(x.name) for x in dir_g]
    pattern = re.compile(f"{n}_.*")#コンパイル
    fileNames = [item for item in paths if pattern.fullmatch(item)]
    dataDict = {}

    for file in fileNames:
        content = ''
        with open(r"data/song/"+ file , 'r',encoding='utf-8') as f:
            content = f.read()
        if ".lrc" in file and "（読み）" in file:
            dataDict["YOMI"] = content
        elif ".lrc" in file and "（読み）" not in file:
            dataDict["KASHI"] = content
        else:
            dataDict["URL"] = content
    return fileNames, dataDict

@eel.expose
def settingLoad():
    with open(setting_json_path, 'r', encoding='utf-8') as f:
        return json.loads(f.read())

@eel.expose
def py_change_volume(sound_data):
    with open(setting_json_path, 'r', encoding='utf-8') as json_file:
        data = json.load(json_file)
    sound_type = sound_data.get('sound_type', '')
    volume = sound_data.get('volume', 0)
    data[sound_type] = volume
    # JSONファイルへの書き込み
    with open(setting_json_path, 'w', encoding='utf-8') as json_file:
        json.dump(data, json_file, ensure_ascii=False, indent=2)
    print("volume:",volume)

eel.init("web")
eel.start("main.html")

