// Copyright (C) 2018 to the present, Crestron Electronics, Inc.
// All rights reserved.
// No part of this software may be reproduced in any form, machine
// or natural, without the express written consent of Crestron Electronics.
// Use of this source code is subject to the terms of the Crestron Software License Agreement
// under which you licensed this source code.

import { TCh5ButtonCheckboxPosition, TCh5ButtonHorizontalAlignLabel, TCh5ButtonIconPosition, TCh5ButtonType, TCh5ButtonVerticalAlignLabel } from ".";
import { ICh5ButtonModeCommonAttributes } from "./i-ch5-button-mode-common";

/**
 * @name Ch5 Button Mode
 * @isattribute false
 * @tagName ch5-button-mode
 * @role ch5-button-mode
 * @description Ch5 Button ch5-button-mode.
 * @componentVersion 1.0.0
 * @documentation
 * [
 *   "`ch5-button-mode` element",
 *   "***",
 *   "PENDING DOCUMENTATION"
 * ]
 * @snippets
 * [
 *  {
 *    "prefix": "ch5-button:blank",
 *     "description": "Crestron Button",
 *     "body": [
 *       "<ch5-button>",
 *       "</ch5-button>$0"
 *     ]
 *   },
 *   {
 *    "prefix": "ch5-button:default",
 *     "description": "Crestron Button",
 *     "body": [
 *       "<ch5-button id=\"btn_${1:id}\"",
 *       "\tlabel=\"${2:Crestron Button}\"",
 *       "\tsendeventonclick=\"${3:btn_${1}_clicked}\">",
 *       "</ch5-button>$0"
 *     ]
 *   },
 *   {
 *     "prefix": "ch5-button:all-attributes",
 *     "description": "Crestron Button (All Attributes)",
 *     "body": [
 *       "<ch5-button id=\"btn_${1:id}\"",
 *       "\tlabel=\"${2:Crestron Button}\"",
 *       "\ttype=\"${3|default,primary,info,text,danger,warning,success,secondary|}\"",
 *       "\tcustomClass=\"${4:customClass}\"",
 *       "\tshape=\"${5|rounded-rectangle,rectangle,tab,circle,oval|}\"",
 *       "\tsize=\"${6|regular,x-small,small,large,x-large|}\"",
 *       "\tstretch=\"${7|both,width,height|}\"",
 *       "\ticonposition=\"${8|first,last,top,bottom|}\"",
 *       "\ticonclass=\"${9:iconClass}\"",
 *       "\torientation=\"${10|horizontal,vertical|}\"",
 *       "\tsendeventonclick=\"${11:btn_${1}_clicked}\"",
 *       "\tsendeventontouch=\"${12:btn_${1}_touched}\"",
 *       "\treceivestateselected=\"${13}\"",
 *       "\treceivestatelabel=\"${14}\"",
 *       "\treceivestatescriptlabelhtml=\"${15}\">",
 *       "</ch5-button>$0"
 *     ]
 *   }
 * ]
 *
 */
export interface ICh5ButtonModeAttributes extends ICh5ButtonModeCommonAttributes {

}
