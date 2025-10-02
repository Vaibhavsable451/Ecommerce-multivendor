import { Box, TextField } from '@mui/material'
import React from 'react'

const BecomeSellerFormStep1 = ({formik}:any) => {
  return (
    <Box>
      <p className='text-2xl font-bold text-center pb-9'>
        Contact Deatils

      </p>
      <div className='space-y-9'>
 <TextField
             fullWidth
             name="mobile"
             label="Mobile"
             value={formik.values.mobile}
             onChange={formik.handleChange}
             error={formik.touched.mobile && Boolean(formik.errors.mobile)}
             helperText={formik.touched.mobile && formik.errors.mobile}
            />
             <TextField
                    fullWidth
                    name="GSTIN"
                    label="GSTIN Number"
                    value={formik.values.GSTIN}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.GSTIN && Boolean(formik.errors.GSTIN)}
                    helperText={formik.touched.GSTIN && formik.errors.GSTIN}
                />

      </div>

    </Box>
  )
}

export default BecomeSellerFormStep1