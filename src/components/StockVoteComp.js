import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {PieChart} from 'react-native-svg-charts';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {moderateScale, textScale, width} from '../styles/responsiveSize';
import colors from '../styles/colors';
import TextComp from './TextComp';
import {
  CrateORUpdateTicker,
  DeleteTickerById,
  GetTickerByStatus,
  GetTickerByUsers,
} from '../redux/actions/news';
import {showSuccess} from '../utils/helperFunctions';
import {buttonSell} from '../constants/static/staticData';

export default function StockVoteComp({tickerData, userData}) {
  const [tickerOptions, setTickerOptions] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [isLocked, setIsLocked] = useState(false);
  const [isDeleted, setIsDelete] = useState(false);
  const [voteLoadingState, setVoteLoadingState] = useState({
    buy: false,
    hold: false,
    sell: false,
    del: false,
  });
  const [selectedColor, setSelectedColor] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const [tickerOptions, chartData] = await Promise.all([
        GetTickerByUsers(userData?.userId),
        GetTickerByStatus(`${tickerData?.ticker}.AT`),
      ]);

      if (tickerOptions) {
        const findTracker = tickerOptions?.find(
          x => x.tickerName == `${tickerData?.ticker}.AT`,
        );

        //   hide the chart and delete button
        if (!findTracker) {
          setIsDelete(false);
        } else {
          setIsDelete(true);
        }
      }

      if (tickerOptions) {
        setTickerOptions(tickerOptions);
      }
      if (chartData) {
        const formattedData = Object.keys(chartData)
          .filter(key => key !== 'tickerName')
          .map(key => ({
            key,
            amount: chartData[key],
            svg: {
              fill:
                key === 'buy'
                  ? colors.green
                  : key === 'hold'
                  ? colors.yellow
                  : colors.red,
            },
            arc: {outerRadius: '90%'},
          }));

        setChartData(formattedData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [userData?.userId, tickerData?.ticker]);

  const handleDeleteVote = async type => {
    const tickerToDelete = tickerOptions.find(
      x => x.tickerName === `${tickerData?.ticker}.AT`,
    );

    if (!tickerToDelete) return;

    setVoteLoadingState(prevState => ({
      ...prevState,
      [type.toLowerCase()]: true,
    }));

    try {
      const res = await DeleteTickerById(tickerToDelete?.id);
      setIsDelete(false);
      showSuccess('Opinion deleted successfully');
    } catch (error) {
      console.error('Error deleting ticker:', error);
    } finally {
      setVoteLoadingState(prevState => ({
        ...prevState,
        [type.toLowerCase()]: false,
      }));
    }
  };

  const handleCreateAndUpdateTicker = async type => {
    const isoDate = new Date().toISOString();
    const payload = {
      userID: userData.userId,
      tickerName: `${tickerData?.ticker}.AT`,
      createdDate: isoDate,
      modifiedDate: isoDate,
      createdBy: `${userData.firstName} ${userData.lastName}`,
      modifiedBy: `${userData.firstName} ${userData.lastName}`,
      tickerStatus: type?.label,
    };

    setVoteLoadingState(prevState => ({
      ...prevState,
      [type?.label]: true,
    }));

    setSelectedColor(type);
    try {
      const res = await CrateORUpdateTicker(payload);

      if (res) {
        await fetchData();
        showSuccess('Vote submitted successfully');
      }
    } catch (error) {
      console.error('Error creating/updating ticker:', error);
    } finally {
      setVoteLoadingState(prevState => ({
        ...prevState,
        [type?.label]: false,
      }));
    }
  };

  return (
    <View
      style={{
        ...styles.cardContainer,
        paddingBottom: isDeleted ? 0 : moderateScale(20),
      }}>
      <TouchableOpacity
        style={[
          styles.container,
          isLocked ? styles.lockedCard : styles.unlockedCard,
          isLocked && {
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            elevation: moderateScale(0.5),
          },
        ]}
        onPress={() => setIsLocked(!isLocked)}
        activeOpacity={0.9}>
        {isLocked ? (
          <View style={styles.lockedContent}>
            <Icon name="lock" size={moderateScale(40)} color="#555" />
            <TextComp>{'Tab Lock'}</TextComp>
          </View>
        ) : (
          <View style={styles.containerMain}>
            <View
              style={{
                width: width / 1.1,
                padding: moderateScale(10),
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <Text style={styles.title}>
                Είναι η μετοχή AAAK.AT για Αγορά ή Πώληση?
              </Text>
              <Text style={styles.subtitle}>
                Πείτε μας την γνώμη σας για την μετοχή και μάθετε τι πιστεύουν
                και άλλοι χρήστες της πλατφόρμας.
              </Text>

              <View style={styles.deleteMainContainer}>
                <Text style={styles.subtitle}>
                  Ψηφήσατε ότι αυτή η μετοχή είναι για
                </Text>
                {isDeleted && (
                  <TouchableOpacity
                    style={[
                      styles.deleteBtnContainer,
                      {
                        backgroundColor: selectedColor?.color,
                      },
                    ]}
                    onPress={() => handleDeleteVote('del')}
                    activeOpacity={0.7}>
                    {voteLoadingState['del'] ? (
                      <ActivityIndicator size="small" color={colors.white} />
                    ) : (
                      <>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                          }}>
                          <TextComp style={{color: colors.white}}>
                            {selectedColor?.label}
                          </TextComp>
                          <Icon
                            name="delete"
                            size={moderateScale(22)}
                            color={colors.white}
                          />
                        </View>
                      </>
                    )}
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View style={styles.buttonsContainer}>
              {buttonSell?.map(type => (
                <TouchableOpacity
                  key={type.id}
                  style={[styles.button, styles[type?.label?.toLowerCase()]]}
                  onPress={() => handleCreateAndUpdateTicker(type)}>
                  {voteLoadingState[type?.label?.toLowerCase()] ? (
                    <ActivityIndicator size="small" color={colors.white} />
                  ) : (
                    <TextComp style={{color: colors.white}}>
                      {type?.label}
                    </TextComp>
                  )}
                </TouchableOpacity>
              ))}
            </View>
            {isDeleted && (
              <View style={styles.chartContainer}>
                <PieChart
                  style={styles.pieChart}
                  data={chartData}
                  valueAccessor={({item}) => item.amount}
                  innerRadius={0}
                  outerRadius={90}
                  labelRadius={110}
                />
                <View style={styles.centerTextContainer}>
                  <Text style={styles.centerText}>{selectedColor?.label}</Text>
                </View>
              </View>
            )}
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width / 1.1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(5),
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: moderateScale(2),
    },
    shadowOpacity: moderateScale(0.25),
  },

  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: moderateScale(2),
    marginTop: moderateScale(8),
    paddingTop: moderateScale(5),
    backgroundColor: colors.white,
    marginHorizontal: moderateScale(15),
    borderRadius: moderateScale(12),
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: moderateScale(2),
    },
    shadowOpacity: moderateScale(0.25),
    elevation: moderateScale(5),
    shadowRadius: moderateScale(3.84),
    shadowColor: colors.black,
  },

  lockedContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockIcon: {
    marginBottom: moderateScale(8),
  },
  card: {
    width: width / 1.05,
    height: moderateScale(190),
    borderRadius: moderateScale(15),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: moderateScale(4),
    shadowColor: '#000',
    shadowOpacity: moderateScale(0.2),
    shadowOffset: {width: 0, height: 3},
    shadowRadius: moderateScale(4),
  },
  lockedCard: {
    backgroundColor: colors.white,
  },
  unlockedCard: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.white,
  },
  lockIcon: {
    opacity: moderateScale(0.8),
  },
  unlockedText: {
    fontSize: textScale(16),
    color: colors.gray,
    fontWeight: 'bold',
  },

  // this card to sell container
  pieChart: {
    height: moderateScale(200),
    width: width / 1.2,
  },
  card2: {
    width: width / 1.1,
    backgroundColor: colors.white,
    borderRadius: moderateScale(10),
    padding: moderateScale(20),
  },
  title: {
    fontSize: textScale(18),
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: moderateScale(10),
  },
  subtitle: {
    fontSize: textScale(12),
    color: colors.gray,
    marginBottom: moderateScale(12),
    fontWeight: '500',
    justifyContent: 'space-between',
  },
  buttonsContainer: {
    width: width / 1.05,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: moderateScale(25),
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(20),
  },
  buy: {
    backgroundColor: colors.green,
  },
  hold: {
    backgroundColor: colors.yellow,
  },
  sell: {
    backgroundColor: colors.red,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  chartContainer: {
    alignItems: 'center',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: moderateScale(20),
    width: '90%',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: moderateScale(20),
    height: moderateScale(20),
    marginRight: moderateScale(5),
  },
  legendText: {
    fontSize: textScale(16),
    fontWeight: '500',
  },
  selectedTextContainer: {
    marginTop: moderateScale(20),
    alignItems: 'center',
  },
  selectedText: {
    fontSize: textScale(16),
    fontWeight: 'bold',
    color: colors.gray,
  },
  deleteBtnContainer: {
    width: moderateScale(60),
    height: moderateScale(35),
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: moderateScale(50),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.black,
  },
  deleteMainContainer: {
    width: width / 1.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(12),
  },

  // pie chart styles here
  stockContainer: {
    width: width / 1,
    height: moderateScale(450),
    paddingHorizontal: moderateScale(12),
  },
  chartContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerTextContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    fontSize: textScale(18),
    fontWeight: 'bold',
    color: colors.white,
  },
  centerValue: {
    fontSize: textScale(24),
    fontWeight: 'bold',
    color: colors.gray,
  },
});
