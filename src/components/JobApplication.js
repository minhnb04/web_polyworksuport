import React, { useState, useEffect } from "react";
import { db } from "../fire";
import { storage } from "../fire";
import { uid } from "uid";
import { v4 } from "uuid";
import { set, ref, onValue, remove, update } from "firebase/database";
import { uploadBytes, getDownloadURL } from "firebase/storage";

const JobApplication = () => {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
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
      title,
      description,
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
    settitle(x.title);
    setdescription(x.description);
  };
  const SubmitChange = () => {
    update(ref(db, `/${tempuuid}`), {
      title,
      description,
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
    <div classtitle="App" style={{ marginTop: 50 }}>
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
          placeholder="Enter your title"
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />
        <br />
        <br />
        <input
          placeholder="Enter your description"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
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
          <table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">Title</th>
      <th scope="col">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{x.title}</td>
      <td>{x.description}</td>
      <button onClick={() => Update(x)}>update</button>
      <button onClick={() => Delete(x)}>delete</button>
    </tr>
  </tbody>
</table>
       

     
          </>
        ))}
      </center>
    </div>
  );
};

export default JobApplication;
