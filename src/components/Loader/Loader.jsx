import React from 'react';
import {loader} from "../../utils/images";
 const styles = {
  image: {
    width:100,
  },

}

const Loader = () => {
  return (
    <>
        <img src = {loader} alt = ""  style={styles.image} />
    </>
  )
}

export default Loader
