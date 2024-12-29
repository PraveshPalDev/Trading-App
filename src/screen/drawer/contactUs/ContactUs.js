import React, {useState} from 'react';
import {Text, KeyboardAvoidingView, ScrollView} from 'react-native';
import TextInputComp from '../../../components/TextInputComp';
import MultiLineTextInputComp from '../../../components/MultiLineTextInput';
import ButtonComp from '../../../components/ButtonCom';
import strings from '../../../constants/lang';
import styles from './styles';
import WrapperContainer from '../../../components/WrapperContainer';
import {showError, showSuccess} from '../../../utils/helperFunctions';
import {emailRegex} from '../../../utils/regex';
import {ContactUsHandler} from '../../../redux/actions/news';

export default function ContactUs() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    const requiredFields = [
      {field: 'name', error: 'Name is required!'},
      {field: 'email', error: 'Email is required!'},
      {field: 'message', error: 'Message is required!'},
    ];

    for (let {field, error} of requiredFields) {
      if (!formData[field].trim()) {
        showError(error);
        return;
      }
    }

    const isValidEmail = email => emailRegex.test(email);
    if (!isValidEmail(formData.email)) {
      showError(strings.VALID_EMAIL_MESSAGE);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        id: 0,
        name: formData?.name,
        email: formData?.email,
        phone: formData?.phone || '',
        message: formData?.message,
        createdDate: new Date().toISOString(),
      };

      const res = await ContactUsHandler(payload);
      if (res) {
        showSuccess('Thanks For Contacting Us.');
        setFormData({
          name: null,
          email: null,
          phone: null,
          message: null,
        });
      }
    } catch (error) {
      showError(error);
      console.log('Error in ContactUs API call:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WrapperContainer>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ScrollView
          contentContainerStyle={styles.formContainer}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.heading}>{strings.Communication}</Text>

          <Text style={styles.label}>{strings.Name}</Text>
          <TextInputComp
            placeholderText={strings.Name}
            value={formData.name}
            setValue={text => handleInputChange('name', text)}
          />

          <Text style={styles.label}>{strings.EmailContact}</Text>
          <TextInputComp
            placeholderText={strings.EmailContact}
            value={formData.email}
            setValue={text => handleInputChange('email', text)}
            keyboardType="email-address"
          />

          <Text style={styles.label}>{strings.Phone}</Text>
          <TextInputComp
            placeholderText={strings.Phone}
            value={formData.phone}
            setValue={text => handleInputChange('phone', text)}
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>{strings.Message}</Text>
          <MultiLineTextInputComp
            placeholderText="Εισαγάγετε το μήνυμα..."
            value={formData.message}
            onChangeText={text => handleInputChange('message', text)}
            multiline
          />

          <ButtonComp
            title={strings.Shipment}
            styleText={styles.btnText}
            onPress={handleSubmit}
            style={styles.buttonStyles}
            loading={loading}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </WrapperContainer>
  );
}
