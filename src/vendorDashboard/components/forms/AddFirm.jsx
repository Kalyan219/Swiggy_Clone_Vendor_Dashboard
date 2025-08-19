import React,{useState} from 'react'
import { API_URL } from '../../data/apiPath';

const AddFirm = () => {
  const [firmName,setFirmName] = useState('');
  const [area,setArea] = useState('');
  const [category,setCategory] = useState([]);
  const [region,setRegion]= useState([]);
  const [offer,setOffer] = useState('');
  const [file, setFile] = useState(null)

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    if(category.includes(value)){
      setCategory(category.filter((item) => item !== value))
    }
    else {
      setCategory([...category, value])
    }
  }

  const handleRegionChange = (event) => {
    const value = event.target.value;
    if(region.includes(value)){
      setRegion(region.filter((item) => item !== value))
    }
    else {
      setRegion([...region, value])
    }
  }

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    setFile(selectedImage)
  }

  const handleFirmSubmit = async(e) => {
      e.preventDefault();
      try {
        const loginToken = localStorage.getItem('loginToken');
        if(!loginToken) {
          console.error('user not authenticated')
        }
        
        const formData = new FormData();
        formData.append('firmName',firmName);
        formData.append('area',area);
        formData.append('offer',offer);
        formData.append('image',file);

        category.forEach((value) => {
          formData.append('category',value)
        });
        region.forEach((value) => {
          formData.append('region',value)
        })
        
        const response = await fetch(`${API_URL}/firm/add-firm`,{
          method:'POST',
          headers: {
            'token': `${loginToken}`
          },
          body: formData
        });

        const data = await response.json()
        if(response.ok){
          console.log(data);
          alert('firm added successfully')
          setFirmName('');
          setArea('');
          setOffer('')
          setCategory([]);
          setRegion([]);
          setFile(null);
        } else if (data.message === "vendor can have only one firm") {
          alert("firm exists only one firm allowed for user");
        }else {
          alert('failed to add firm');
        }

       console.log('this is firm id:',data.firmId);
        
       const saveFirmId = data.firmId;

       localStorage.setItem('firmId', saveFirmId);

      } catch (error) {
        console.error(error);
        alert('failed to add firm')
      }
  }

  return (
    <div className="firmSection">
        <form className="tableForm" onSubmit={handleFirmSubmit}>
            <h3>Add Firm</h3>
            <label>Firm Name</label><br />
            <input type='text' name='firmName' value={firmName} onChange={(e) => setFirmName(e.target.value)}/><br/>
            <label>Area</label><br />
            <input type='text' name='area'  value={area} onChange={(e) => setArea(e.target.value)} /><br/>
            {/*<label>Category</label><br />
            <input type='text' /><br/>*/}
            <div className="checkInp">
              <label>Category</label>
              <div className="inputsContainer">
                <div className="checkboxContainer">
                  <label>Veg</label>
                  <input type='checkbox' checked = {category.includes('veg')} value='veg' onChange={handleCategoryChange}/>
                </div>
                <div className="checkboxContainer">
                  <label>Non-Veg</label>
                  <input type='checkbox' value='non-veg' checked = {category.includes('non-veg')}  onChange={handleCategoryChange}/>
                </div>
              </div>
            </div>
            {/*<label>Region</label><br />
            <input type='text' /><br/>*/}
            <label>Offer</label><br />
            <input type='text'  value={offer} onChange={(e) => setOffer(e.target.value)}/><br/>
            <div className="checkInp">
              <label>Region</label>
              <div className="inputsContainer">
                <div className="regionCheckbox">
                  <label>south-indian</label>
                  <input type='checkbox' checked = {region.includes('south-indian')}  onChange={handleRegionChange} value='south-indian' />
                </div>
                <div className="regionCheckbox">
                  <label>north-indian</label>
                  <input type='checkbox' checked = {region.includes('north-indian')}  onChange={handleRegionChange} value='north-indian' />
                </div>
                <div className="regionCheckbox">
                  <label>Chinese</label>
                  <input type='checkbox' checked = {region.includes('chinese')}  onChange={handleRegionChange} value='chinese' />
                </div>
                <div className="regionCheckbox">
                  <label>Bakery</label>
                  <input type='checkbox' checked = {region.includes('bakery')}  onChange={handleRegionChange} value='bakery' />
                </div>
              </div>
            </div>
            <label>Firm Image</label><br />
            <input type='file'  onChange={handleImageUpload} /><br/>
            <div className="btnSubmit">
               <button type='submit'>Submit</button>
           </div>
        </form>
    </div>
  )
}

export default AddFirm