import * as yup from 'yup';
import { errorMesages } from './errorMessages';

const paymentSchema = yup
  .object({
    number: yup
      .string()
      .required(errorMesages.number.required)
      .min(16, errorMesages.number.min),
    nameOnCard: yup.string().required(errorMesages.nameOnCard.required),
    expDate: yup
      .string()
      .required(errorMesages.expDate.required)
      .min(4, errorMesages.expDate.min),
    cvc: yup
      .string()
      .required(errorMesages.cvc.required)
      .min(3, errorMesages.cvc.min),
  })
  .required(errorMesages.form.required);

export default paymentSchema;
