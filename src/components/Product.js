import React, { useState } from 'react'

import {
    ref,
    uploadBytes,
    getDownloadURL
  } from "firebase/storage";
  import { storage } from "../config";
  import { v4 } from "uuid";

const Room = () => {
    const [imageUpload, uploadimg] = useState(null);
  

    const savehandler = async (res) => {
        let title = document.getElementById('title').value;
        let description = document.getElementById('description').value;
        let price = document.getElementById('price').value;
        let collection = document.getElementById('collection').value;
        if(collection == ""){
            alert('please select collection name');
            return;
        }

        const imageRef = ref(storage, `Shopping/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then(async (url) => {

                let response = await fetch(`http://localhost:8080/api/product`, {
                    method: "POST",
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ title: title, description: description,price: price,collections:collection,image:url })
                });
                let res = await response.json();
                console.log(res)
                if(res.success){
                    alert('Product Add Successfully!')
                }else{
                    alert('Something went Wrong!')
                }

            });
        });

    }
    return (
        <div className='card mt-5'>
            <h3>Create a New Product</h3>
            <div className='form-group'>
                <label>Enter Title</label>
                <input className='form-control' type="text" id="title" placeholder="Enter Title" />
            </div>

            <div className='form-group'>
                <label>Enter description</label>
                <textarea className='form-control' id="description" placeholder="Enter Description..." ></textarea>
            </div>

            <div className='form-group'>
                <label>Price</label>
                <input className='form-control' type="text" id="price" placeholder="Enter Price" />
            </div>

            <div className='form-group'>
                <label>Select Collection</label>
                <select className='form-control' id='collection'>
                    <option value="">---Select Collection---</option>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                </select>
            </div>
           

            <div className='form-group'>
                <label>Upload Product Image</label>
                <input className='form-control' type="file" onChange={(event) => uploadimg(event.target.files[0])} />
            </div>


            <div className='form-group'>
                <button onClick={savehandler} className='btn btn-block btn-success'>Add Product</button>
            </div>

        </div>
    )
}

export default Room