import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import axios from 'axios';
import {SearchBar, List, Button} from '@ant-design/react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  storeResult,
  removeResult,
  storeHistory,
  removeHistory,
  storeGeometry,
} from '../redux/Action';
import Map from './Map';
import {API_KEY} from '@env';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Home = () => {
  const [input, setInput] = useState('');
  const [toggle, setToggle] = useState(false);

  const {results, geometery, history} = useSelector(state => state.dataReducer);

  const dispatch = useDispatch();

  const _autoComplete = value => {
    let input = `input=${value}&types=geocode`;
    let api_key = API_KEY;

    let config = {
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${api_key}&${input}`,
      headers: {},
    };

    axios(config)
      .then(resp => {
        dispatch(storeResult(resp.data.predictions));
      })
      .catch(error => {
        console.log('ERROR: ', error);
        Alert.alert(error);
      });
  };

  const _findDetail = id => {
    let place_id = `place_id=${id}`;
    let api_key = API_KEY;
    console.log('od', id);
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/details/json?key=${api_key}&${place_id}`,
      )
      .then(resp => {
        setInput(resp.data.result.formatted_address);

        if (
          history.findIndex(
            obj => obj.place_id == resp.data.result.place_id,
          ) === -1
        ) {
          dispatch(storeHistory(resp.data.result));
        }

        dispatch(storeGeometry(resp.data.result));

        _toggleSearch(true);
      })
      .catch(error => {
        console.log('ERROR: ', error);
        Alert.alert(error);
      });
  };

  const _toggleSearch = value => {
    setToggle(value);
  };

  return (
    <ScrollView contentContainerStyle={{flex: 1}}>
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <SearchBar
              value={input}
              placeholder="Search"
              onSubmit={value => {
                _autoComplete(value);
              }}
              onCancel={value => {
                if (value) {
                  setInput('');
                  dispatch(removeResult());
                }
              }}
              onChange={value => {
                setInput(value);
                _autoComplete(value);
              }}
              onFocus={() => {
                _toggleSearch(false);
              }}
              cancelText="Clear"
              showCancelButton
            />
            {toggle ? null : (
              <>
                <View
                  style={{
                    position: 'absolute',
                    top: 40,
                    left: 0,
                    right: 0,
                    zIndex: 1,
                    backgroundColor: '#fff',
                    maxHeight: 300,
                  }}>
                  <KeyboardAwareScrollView>
                    <List>
                      {results?.map((result, index) => {
                        return (
                          <List.Item key={index}>
                            <TouchableOpacity
                              onPress={() => {
                                _findDetail(result.place_id);
                              }}>
                              <Text>{result?.description}</Text>
                            </TouchableOpacity>
                          </List.Item>
                        );
                      })}
                    </List>
                    {history.length > 0 ? (
                      <List renderHeader={'History'}>
                        {history?.reverse().map((result, index) => {
                          if (index < 5) {
                            return (
                              <List.Item
                                key={index}
                                onPress={() => {
                                  _findDetail(result.place_id);
                                  setInput(result?.formatted_address);
                                }}
                                extra={
                                  <TouchableOpacity
                                    onPress={() => {
                                      dispatch(removeHistory(result.place_id));
                                    }}>
                                    <Text>Remove</Text>
                                  </TouchableOpacity>
                                }>
                                <Text>{result.formatted_address}</Text>
                              </List.Item>
                            );
                          }
                        })}
                      </List>
                    ) : null}
                  </KeyboardAwareScrollView>
                </View>
              </>
            )}
            <Map geometery={geometery} _toggleSearch={_toggleSearch} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Home;
