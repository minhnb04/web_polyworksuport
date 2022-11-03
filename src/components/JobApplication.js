import React, { useState, useEffect } from "react";
import { db } from "../fire";
import { storage } from "../fire";
import { uid } from "uid";
import { v4 } from "uuid";
import { set, ref, onValue, remove, update } from "firebase/database";
import { uploadBytes, getDownloadURL } from "firebase/storage";

const JobApplication = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(false);
  const [tempuuid, setTempuuid] = useState("");

  //push
  const Push = () => {
    const uuid = uid();
    set(ref(db, `${uuid}`), {
      name,
      age,
      uuid,
    }).catch(alert);
  };
  //read
  const Read = () => {
    onValue(ref(db), (snapshot) => {
      setTodos([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((x) => {
          setTodos((oldArray) => [...oldArray, x]);
        });
      }
    });
  };
  //delete
  const Delete = (x) => {
    console.log(x.uuid);
    remove(ref(db, `/${x.uuid}`));
  };
  //update
  const Update = (x) => {
    setEdit(true);
    setTempuuid(x.uuid);
    setName(x.name);
    setAge(x.age);
  };
  const SubmitChange = () => {
    update(ref(db, `/${tempuuid}`), {
      name,
      age,
      uuid: tempuuid,
    });

    setEdit(false);
  };
  //upload Image
  const upLoadImg = () => {
    if (image == null) return;
    const imageRef = ref(storage, "image");
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
          })
          .catch((error) => {
            console.log(error.message, "error getting the image");
          });
        setImage(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  //get Image
  // const imageListRef = ref(storage, "images/");
  // const getImg = () => {
  //   listAll(ref(storage, "images/")).then((res) => {
  //     console.log(res);
  //   });
  // };
  useEffect(() => {
    Read();
    // listAll(imageListRef).then((response) => {
    //   console.log(response);
    // });
    // getImg();
  }, []);
  return (
    <div className="App" style={{ marginTop: 50 }}>
      <center>
        <img src={url} class="img-thumbnail" alt="..." />
        <input
          type={"file"}
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
        <br />
        <button onClick={upLoadImg}>Upload Image</button>
        <br />
        <input
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <br />
        <input
          placeholder="Enter your age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <br />
        <br />

        {edit ? (
          <>
            <button onClick={SubmitChange}>Submit Change</button>
            <button onClick={() => setEdit(false)}>x</button>
          </>
        ) : (
          <button onClick={Push}>Submit</button>
        )}
        <br />
        <br />
        {todos.map((x) => (
          <>
            <div class="card">
              <img
                src="https://ps.w.org/metronet-profile-picture/assets/icon-256x256.png?rev=2464419"
                class="card-img-top"
                alt="..."
              />
              <div class="card-body">
                <h4 class="card-subtitle mb-2 text-muted">{x.name}</h4>
                <p class="card-text">{x.age}</p>
                <button onClick={() => Update(x)}>update</button>
                <button onClick={() => Delete(x)}>delete</button>
              </div>
            </div>

            {/* <text>{x.name}</text>
            <br />
            <text>{x.age}</text>
            <br />
            <button onClick={() => Update(x)}>update</button>
            <button onClick={() => Delete(x)}>delete</button>
            <br /> */}
          </>
        ))}
      </center>
    </div>
  );
};

export default JobApplication;
