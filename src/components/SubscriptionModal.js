import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import ModalComp from './ModalComp';
import {
  height,
  moderateScale,
  textScale,
  width,
} from '../styles/responsiveSize';
import colors from '../styles/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CheckCouponCode} from '../redux/actions/news';
import {logoutHandler, showError} from '../utils/helperFunctions';
import {useDispatch} from 'react-redux';
import {setRegisterTrue} from '../redux/reducers/registerSlice';

const SubscriptionModal = ({isVisible, setIsVisible}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [price, setPrice] = useState('€0');
  const [couponCode, setCouponCode] = useState('');
  const [isValidCoupon, setIsValidCoupon] = useState('');
  const dispatch = useDispatch();

  const tabData = [
    {title: 'FREE TRIAL', price: '€0'},
    {title: 'MONTHLY', price: '€9.99'},
    {title: 'ANNUAL', price: '€107.88'},
  ];

  const handleTabChange = index => {
    setActiveTab(index);
    setPrice(tabData[index].price);
  };

  const applyCouponCodeHandler = async () => {
    if (couponCode?.length > 0) {
      try {
        const res = await CheckCouponCode(couponCode);
        if (res) {
          setIsValidCoupon(true);
          setIsVisible(false);
          setCouponCode('');
        }
      } catch (error) {
        setIsValidCoupon(false);
        setCouponCode('');
        showError(`${error}` || 'Something went wrong!!');
      }
    }
  };

  const submitHandler = async () => {
    setIsVisible(false);
    dispatch(setRegisterTrue());
    logoutHandler(dispatch);
  };

  return (
    <ModalComp
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setIsVisible(false)}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setCouponCode('');
              setIsValidCoupon('');
              setIsVisible(false);
            }}>
            <Icon name="close" color={colors.black} size={moderateScale(30)} />
          </TouchableOpacity>
          <Text style={styles.title}>Subscribe to Become a Pro Member</Text>

          <View style={styles.tabContainer}>
            {tabData?.map((item, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                style={[styles.tab, activeTab === index && styles.activeTab]}
                onPress={() => handleTabChange(index)}>
                <Text
                  style={[
                    styles.tabText,
                    activeTab === index && styles.activeTabText,
                  ]}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.priceContainer}>
            {activeTab === 0 && (
              <>
                <Text style={styles.freePrice}>{price}</Text>
                <Text style={styles.strikethroughPrice}>€9.99</Text>
              </>
            )}
            {activeTab === 1 && (
              <>
                <Text style={styles.freePrice}>{price}</Text>
              </>
            )}
          </View>

          {activeTab === 2 && (
            <>
              <View style={styles.priceContainer}>
                <Text style={styles.freePrice}>{price}</Text>
                {activeTab === 2 && (
                  <Text style={styles.strikethroughPrice}>{'€119.88'}</Text>
                )}
              </View>

              <View style={styles.couponContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter coupon code..."
                  value={couponCode}
                  onChangeText={setCouponCode}
                />
                <TouchableOpacity
                  style={styles.applyButton}
                  onPress={applyCouponCodeHandler}
                  activeOpacity={0.7}>
                  <Text style={styles.applyButtonText}>Apply</Text>
                </TouchableOpacity>
              </View>
              {isValidCoupon === true && (
                <Text style={styles.successText}>
                  Coupon applied successfully!
                </Text>
              )}
              {isValidCoupon === false && (
                <Text style={styles.errorText}>Invalid coupon code.</Text>
              )}
            </>
          )}

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.subscribeButton}
            onPress={submitHandler}>
            <Text style={styles.subscribeText}>BECOME A MEMBER</Text>
          </TouchableOpacity>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.benefitsTitle}>Benefits:</Text>
            <Text style={styles.benefit}>
              ✔ Trade-Link News Hub: All important news from the internet and
              the Greek markets in one page.
            </Text>
            <Text style={styles.benefit}>
              ✔ Trade-Link Calendar: Detailed daily, weekly, and monthly
              announcements of financial events, dividend payments, results
              announcements, and corporate events.
            </Text>
            <Text style={styles.benefit}>
              ✔ Trade-Link Markets: Real-time market price and movement
              monitoring.
            </Text>
            <Text style={styles.benefit}>
              ✔ Trade-Link Lists: Curated stock lists using previous models.
            </Text>
            <Text style={styles.benefit}>
              ✔ Trade-Link Company Profiles: Comprehensive profiles of Greek
              stocks with full financial analysis and statistics.
            </Text>
            <Text style={styles.benefit}>
              ✔ Trade-Link Technical Analysis: Technical analysis of dozens of
              technical indicators for all Greek stocks.
            </Text>
            <Text style={styles.benefit}>
              ✔ Trade-Link Research: Specialized analyses and financial reviews
              fully tailored to your needs.
            </Text>
            <Text style={styles.benefit}>
              ✔ Trade-Link Broadcast: Instant updates, news, and analyses for
              the markets directly on your mobile.
            </Text>
          </ScrollView>
        </View>
      </View>
    </ModalComp>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width / 1.05,
    height: height / 1.1,
    backgroundColor: colors.white,
    borderRadius: moderateScale(15),
    padding: moderateScale(15),
  },
  cardBorderContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: width / 1.12,
    padding: moderateScale(10),
    borderWidth: 1,
    borderColor: colors.grayOpacity80,
    borderRadius: moderateScale(10),
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: moderateScale(5),
  },
  closeText: {
    fontSize: textScale(18),
    fontWeight: 'bold',
    color: colors.black,
  },
  title: {
    fontSize: textScale(20),
    fontWeight: 'bold',
    marginBottom: moderateScale(20),
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: moderateScale(20),
  },
  activeTabText: {
    color: colors.white,
  },
  tab: {
    flex: 1,
    padding: moderateScale(10),
    borderWidth: 1,
    borderColor: colors.blue,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: moderateScale(2),
  },
  activeTab: {
    flex: 1,
    padding: moderateScale(10),
    backgroundColor: colors.blue,
    alignItems: 'center',
  },
  tabText: {
    color: colors.black,
    fontWeight: 'bold',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(20),
    alignSelf: 'center',
  },
  freePrice: {
    fontSize: textScale(24),
    fontWeight: 'bold',
    color: colors.blue,
    marginRight: moderateScale(10),
  },
  strikethroughPrice: {
    fontSize: textScale(16),
    color: 'gray',
    textDecorationLine: 'line-through',
  },
  subscribeButton: {
    backgroundColor: '#FFD700',
    padding: moderateScale(15),
    borderRadius: moderateScale(8),
    marginBottom: moderateScale(20),
  },
  subscribeText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.black,
  },
  benefitsTitle: {
    fontSize: textScale(18),
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  benefit: {
    fontSize: textScale(14),
    marginBottom: moderateScale(10),
  },

  couponContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(10),
  },
  input: {
    flex: 1,
    height: moderateScale(40),
    borderColor: colors.grayOpacity80,
    borderWidth: 1,
    borderRadius: moderateScale(5),
    paddingHorizontal: moderateScale(10),
    marginRight: moderateScale(10),
  },
  applyButton: {
    backgroundColor: colors.blue,
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(5),
  },
  applyButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  couponTitle: {
    fontSize: textScale(14),
    fontWeight: 'bold',
    marginBottom: moderateScale(5),
  },
  successText: {
    color: '#12ad05',
    fontSize: textScale(16),
    fontWeight: '700',
    fontStyle: 'italic',
    marginBottom: moderateScale(15),
    textAlign: 'center',
  },
  errorText: {
    color: colors.red,
    fontSize: textScale(16),
    fontWeight: '700',
    fontStyle: 'italic',
    marginBottom: moderateScale(15),
    textAlign: 'center',
  },
});

export default SubscriptionModal;
