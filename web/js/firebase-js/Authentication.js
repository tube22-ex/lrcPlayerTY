document.addEventListener('DOMContentLoaded',()=>setTimeout(firebaseFunc,2000));

function firebaseFunc(){
    const auth = firebase.auth(); 
    const icon_input = document.querySelector('input#input_icon');
    const name_input = document.querySelector('input[name="name_input"]');

    icon_input.addEventListener('change',(e)=>{

    const selectedFile = e.target.files[0];
    const uploadTask = storage.child("images/" + selectedFile.name).put(selectedFile);

    uploadTask.on("state_changed",
    (snapshot) => {
        // アップロード進捗
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("アップロード進捗: " + progress + "%");
    },
    (error) => {
        console.error("アップロードエラー: " + error);
      },
    () => {
        // アップロード終わった時の処理
        console.log("アップロードが完了しました");

        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        auth.currentUser.updateProfile({
            photoURL: downloadURL
        }).then(function () {

            alert("プロフィール画像が設定されました");
            const user = auth.currentUser;
            updateAccountData(user.uid, user.displayName, user.photoURL)
        }).catch(function (error) {
            console.error("更新エラー: " + error);
        });
        });

    }
    );
    })

    name_input.addEventListener('change',(e)=>{
    auth.currentUser.updateProfile({
        displayName: e.target.value
    }).then(()=>{
        alert(e.target.value + "に設定しました")
        const user = auth.currentUser;
        updateAccountData(user.uid, user.displayName, user.photoURL)
    });
    })

    // ボタンのクリックイベントを処理
    document.getElementById('login-logout-button').addEventListener('click', function() {
        const user = auth.currentUser;
        if (user) {
        // ログインしている時のログアウト
        auth.signOut()
            .then(function() {
            alert('ログアウトしました。');
            document.getElementById('login-logout-button').textContent = 'ログイン';
            })
        } else {
        auth.signInWithPopup(provider)
            .then(function(result) {
            // ログイン成功時の処理
            var user = result.user;
            main(user)

            })
        }
    });
    
    function main(user){
        if(user){
        user = auth.currentUser;
        }
        console.log(auth.currentUser)
    }

    auth.onAuthStateChanged(function(user) {
        if (user) {
        document.getElementById('login-logout-button').textContent = 'ログアウト';
        document.getElementById('display_name').textContent = user.displayName;
        localStorage.setItem('displayName',user.displayName);
        localStorage.setItem('uid',user.uid)
        document.getElementById('icon').setAttribute('src',user.photoURL);
        updateAccountData(user.uid, user.displayName, user.photoURL)
        }
    });

    function updateAccountData(uid, displayName, icon) {
        const userData = {
            "dispName": displayName,
            "iconURL": icon
        };
    
        DB.ref('user/' + uid).update(userData)
    }
    
}