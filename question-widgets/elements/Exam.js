import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../actions'
import * as constants from "../constants/index"

import {View,ScrollView} from 'react-native'
import {ListItem, Text} from 'react-native-elements'
import {Button} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}  from 'react-native-elements'
import {ButtonGroup} from 'react-native-elements'
import QuestionTypeButtonGroupChooser from "./QuestionTypeButtonGroupChooser";

