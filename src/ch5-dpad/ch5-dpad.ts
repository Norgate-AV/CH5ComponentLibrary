import _ from "lodash";
import { Ch5Common } from "../ch5-common/ch5-common";
import { Ch5RoleAttributeMapping } from "../utility-models";
import { Ch5DpadCenter } from "./ch5-dpad-button-center";
import { Ch5DpadTop } from "./ch5-dpad-button-top";
import { Ch5DpadRight } from "./ch5-dpad-button-right";
import { Ch5DpadBottom } from "./ch5-dpad-button-bottom";
import { Ch5DpadLeft } from "./ch5-dpad-button-left";
import { CH5DpadUtils } from "./ch5-dpad-utils";
import { ICh5DpadAttributes } from "./interfaces/i-ch5-dpad-interfaces";
import { TCh5DpadShape, TCh5DpadStretch, TCh5DpadType } from "./interfaces/t-ch5-dpad";
import { Ch5Signal, Ch5SignalFactory } from "../ch5-core";
import { TCh5CreateReceiveStateSigParams } from "../ch5-common/interfaces";

export class Ch5Dpad extends Ch5Common implements ICh5DpadAttributes {
    //#region 1. Variables

    //#region 1.1 readonly variables

    /**
     * The first value is considered the default one
     */
    public static readonly TYPES: TCh5DpadType[] = ['default', 'primary', 'info', 'text', 'danger', 'warning', 'success', 'secondary'];

    /**
     * The first value is considered the default one
     */
    public static readonly SHAPES: TCh5DpadShape[] = ['plus', 'circle'];

    /**
     * No default value for Stretch
     */
    public static readonly STRETCHES: TCh5DpadStretch[] = ['both', 'width', 'height'];

    public readonly primaryCssClass = 'ch5-dpad';
    public readonly cssClassPrefix = 'ch5-dpad';

    //#endregion

    //#region 1.2 private / protected variables

    // private setter getter specific vars
    private COMPONENT_NAME: string = "ch5-dpad";
    private _contractName: string = '';
    private _type: TCh5DpadType = 'default';
    private _shape: TCh5DpadShape = 'plus';
    private _stretch: TCh5DpadStretch = 'both';
    private _sendEventOnClickStart: string = '';
    private _useContractforEnable: boolean = false;
    private _useContractForShow: boolean = false;
    private _useContractForCustomStyle: boolean = false;
    private _useContractForCustomClass: boolean = false;
    private _useContractforEnableSignalValue: string = '';
    private _useContractForShowSignalValue: string = '';
    private _useContractForCustomStyleSignalValue: string = '';
    private _useContractForCustomClassSignalValue: string = '';

    // state specific vars
    private isComponentLoaded: boolean = false;

    // elements specific vars

    //#endregion

    //#endregion

    //#region 2. Setters and Getters

    /**
     * contractName specif getter-setter
     */
    public set contractName(value: string) {
        this.info('set contractName("' + value + '")');

        if (_.isNil(value)) {
            value = '';
        }

        const trValue: string = this._getTranslatedValue('contractName', value);
        if (trValue === this.contractName) {
            return;
        }

        this._contractName = trValue;
        this.setAttribute('contractName', trValue);
    }
    public get contractName(): string {
        return this._contractName;
    }

    /**
     * type specif getter-setter
     */
    public set type(value: TCh5DpadType) {
        this.info('set type("' + value + '")');

        if (_.isNil(value)) {
            value = 'default';
        }

        const trValue: TCh5DpadType = this._getTranslatedValue('type', value) as TCh5DpadType;
        if (trValue === this.type) {
            return;
        }

        this._type = trValue;
        this.setAttribute('type', trValue);
    }
    public get type(): TCh5DpadType {
        return this._type;
    }

    /**
     * shape specif getter-setter
     */
    public set shape(value: TCh5DpadShape) {
        this.info('set shape("' + value + '")');

        if (_.isNil(value)) {
            value = 'plus';
        }

        const trValue: TCh5DpadShape = this._getTranslatedValue('shape', value) as TCh5DpadShape;
        if (trValue === this.shape) {
            return;
        }

        this._shape = trValue;
        this.setAttribute('shape', trValue);
    }
    public get shape(): TCh5DpadShape {
        return this._shape;
    }

    /**
     * stretch specif getter-setter
     */
    public set stretch(value: TCh5DpadStretch) {
        this.info('set stretch("' + value + '")');

        if (_.isNil(value)) {
            value = 'both';
        }

        const trValue: TCh5DpadStretch = this._getTranslatedValue('stretch', value) as TCh5DpadStretch;
        if (trValue === this.stretch) {
            return;
        }

        this._stretch = trValue;
        this.setAttribute('stretch', trValue);
    }
    public get stretch(): TCh5DpadStretch {
        return this._stretch;
    }

    /**
     * sendEventOnClickStart specif getter-setter
     */
    public set sendEventOnClickStart(value: string) {
        this.info('set sendEventOnClickStart("' + value + '")');

        if (_.isNil(value)) {
            value = '';
        }

        const trValue: string = this._getTranslatedValue('sendEventOnClickStart', value);
        if (trValue === this.sendEventOnClickStart) {
            return;
        }

        this._sendEventOnClickStart = trValue;
        this.setAttribute('sendEventOnClickStart'.toLowerCase(), trValue);
    }
    public get sendEventOnClickStart(): string {
        return this._sendEventOnClickStart;
    }

    /**
     * useContractforEnable specif getter-setter
     */
    public set useContractforEnable(value: boolean) {
        this.info('Ch5Dpad set useContractforEnable("' + value + '")');

        const isUseContractforEnable = this._toBoolean(value);
        const contractName = CH5DpadUtils.getAttributeAsString(this, 'contractname', '');

        if (contractName.length === 0 || this._useContractForShow === isUseContractforEnable) {
            return;
        }

        this.setAttribute('usecontractforcustomstyle', isUseContractforEnable.toString());
        this._useContractForCustomClass = isUseContractforEnable;
        const sigVal = contractName + ".Enable";

        const params: TCh5CreateReceiveStateSigParams = {
            caller: this,
            attrKey: 'useContractforEnable',
            value: sigVal,
            callbackOnSignalReceived: (newValue: string | boolean) => {
                newValue = (!newValue).toString();
                this.info(' subs callback for useContractforEnable: ', this._useContractforEnableSignalValue,
                    ' Signal has value ', newValue);
                CH5DpadUtils.setAttributeToElement(this, 'disabled', newValue);
            }
        };

        this.setValueForReceiveStateBoolean(params);
    }
    public get useContractforEnable(): boolean {
        return this._useContractforEnable;
    }

    /**
     * useContractForShow specif getter-setter
     */
    public set useContractForShow(value: boolean) {
        this.info('Ch5Dpad set useContractForShow("' + value + '")');

        const isUseContractForShow = this._toBoolean(value);
        const contractName = CH5DpadUtils.getAttributeAsString(this, 'contractname', '');

        if (contractName.length === 0 || this._useContractForShow === isUseContractForShow) {
            return;
        }

        this.setAttribute('useContractForShow', isUseContractForShow.toString());
        const sigVal = contractName + ".Show";

        const params: TCh5CreateReceiveStateSigParams = {
            caller: this,
            attrKey: 'useContractForShow',
            value: sigVal,
            callbackOnSignalReceived: (newValue: string | boolean) => {
                newValue = newValue.toString();
                this.info(' subs callback for signalReceiveShow: ', this._useContractForShowSignalValue,
                    ' Signal has value ', newValue);
                CH5DpadUtils.setAttributeToElement(this, 'show', newValue);
            }
        };

        this.setValueForReceiveStateBoolean(params);
    }
    public get useContractForShow(): boolean {
        return this._useContractForShow;
    }

    /**
     * useContractForCustomStyle specif getter-setter
     */
    public set useContractForCustomStyle(value: boolean) {
        this.info('Ch5Dpad set useContractForCustomStyle("' + value + '")');

        const isUseContractForCustomStyle = this._toBoolean(value);
        const contractName = CH5DpadUtils.getAttributeAsString(this, 'contractname', '');

        if (contractName.length === 0 || this._useContractForShow === isUseContractForCustomStyle) {
            return;
        }

        this.setAttribute('usecontractforcustomstyle', isUseContractForCustomStyle.toString());
        this._useContractForCustomClass = isUseContractForCustomStyle;
        const sigVal = contractName + ".CustomStyle";

        const params: TCh5CreateReceiveStateSigParams = {
            caller: this,
            attrKey: 'useContractForCustomStyle',
            value: sigVal,
            callbackOnSignalReceived: (newValue: string | boolean) => {
                newValue = newValue as string;
                this.info(' subs callback for useContractForCustomStyle: ', this._useContractForCustomStyleSignalValue,
                    ' Signal has value ', newValue);
                this.customStyle = newValue;
            }
        };

        this.setValueForReceiveStateString(params);
    }
    public get useContractForCustomStyle(): boolean {
        return this._useContractForCustomStyle;
    }

    /**
     * useContractForCustomClass specif getter-setter
     */
    public set useContractForCustomClass(value: boolean) {
        this.info('Ch5Dpad set useContractForCustomClass("' + value + '")');

        const isUuseContractForCustomClass = this._toBoolean(value);
        const contractName = CH5DpadUtils.getAttributeAsString(this, 'contractname', '');

        if (contractName.length === 0 || this._useContractForShow === isUuseContractForCustomClass) {
            return;
        }

        this.setAttribute('usecontractforcustomclass', isUuseContractForCustomClass.toString());
        this._useContractForCustomClass = isUuseContractForCustomClass;
        const sigVal = contractName + ".CustomClass";

        const params: TCh5CreateReceiveStateSigParams = {
            caller: this,
            attrKey: 'useContractForCustomClass',
            value: sigVal,
            callbackOnSignalReceived: (newValue: string | boolean) => {
                newValue = newValue as string;
                this.info(' subs callback for useContractForCustomClass: ', this._useContractForCustomClassSignalValue,
                    ' Signal has value ', newValue);
                this.customClass = newValue;
            }
        };

        this.setValueForReceiveStateString(params);
    }
    public get useContractForCustomClass(): boolean {
        return this._useContractForCustomClass;
    }

    /**
     *  overriding default receiveStateShow specif getter-setter
     */
    public set show(value: boolean) {
        const isContractBased = this.checkIfContractAllows("useContractForShow", "receiveStateShow", value);
        if (isContractBased) {
            // contract name exists and attribute allows it to be based on contract, then receiveStateShow becomes void
            return;
        }
        if (value !== this._show) {
            this._show = value;
            this.setAttribute('show', value.toString());
        }
    }

    /**
     *  overriding default receiveStateShow specif getter-setter
     */
    public set disabled(value: boolean) {
        const isContractBased = this.checkIfContractAllows("useContractforEnable", "receiveStateEnable", value);
        if (isContractBased) {
            // contract name exists and attribute allows it to be based on contract, then receiveStateEnable becomes void
            return;
        }
        if (null === value || undefined === value) {
            value = false;
        }
        if (value !== this._disabled) {
            this._disabled = this._toBoolean(value);
            if (this._disabled) {
                this.setAttribute('disabled', '');
            } else {
                this.removeAttribute('disabled');
            }
        }
    }

    /**
     * overriding default receiveStateShow specif getter-setter
     */
    public set receiveStateShow(value: string) {
        const isContractBased = this.checkIfContractAllows("useContractForShow", "receiveStateShow", value);
        if (isContractBased) {
            // contract name exists and attribute allows it to be based on contract, then receiveStateShow becomes void
            return;
        }
        value = this._checkAndSetStringValue(value);
        if ('' === value || value === this._receiveStateShow) {
            return;
        }

        this.clearBooleanSignalSubscription(this._receiveStateShow, this._subKeySigReceiveShow);

        this._receiveStateShow = value;
        this.setAttribute('receivestateshow', value);

        const recSigShowName: string = Ch5Signal.getSubscriptionSignalName(this._receiveStateShow);
        const recSig: Ch5Signal<boolean> | null = Ch5SignalFactory.getInstance().getBooleanSignal(recSigShowName);

        if (null === recSig) {
            return;
        }

        this._subKeySigReceiveShow = recSig.subscribe((newVal: boolean) => {
            this.info(' subs callback for signalReceiveShow: ', this._subKeySigReceiveShow, ' Signal has value ', newVal);
            this.show = newVal;
        });
    }

    /**
     * overriding default receiveStateEnable specif getter-setter
     */
    public set receiveStateEnable(value: string) {
        const isContractBased = this.checkIfContractAllows("useContractforEnable", "receiveStateEnable", value);
        if (isContractBased) {
            // contract name exists and attribute allows it to be based on contract, then receiveStateEnable becomes void
            return;
        }
        value = this._checkAndSetStringValue(value);
        if ('' === value || value === this._receiveStateEnable) {
            return;
        }

        this.clearBooleanSignalSubscription(this._receiveStateEnable, this._subKeySigReceiveEnable);

        this._receiveStateEnable = value;
        this.setAttribute('receivestateenable', value);

        const recSigEnableName: string = Ch5Signal.getSubscriptionSignalName(this._receiveStateEnable);
        const recSig: Ch5Signal<boolean> | null = Ch5SignalFactory.getInstance().getBooleanSignal(recSigEnableName);

        if (null === recSig) {
            return;
        }
        let hasSignalChanged = false;
        this._subKeySigReceiveEnable = recSig.subscribe((newVal: boolean) => {
            this.info(' subs callback for signalReceiveEnable: ', this._subKeySigReceiveEnable, ' Signal has value ', newVal);

            if (!this.disabled !== newVal) {
                hasSignalChanged = true;
            }
            if (hasSignalChanged) {
                if (true === newVal) {
                    this.removeAttribute('disabled');
                } else {
                    this.setAttribute('disabled', '');
                }
            }
        });
    }

    /**
     * overriding default receiveStateHidePulse specif getter-setter
     */
    public set receiveStateHidePulse(value: string) {
        this.info('Ch5Dpad set receiveStateHidePulse("' + value + '")');
        const isContractBased = this.checkIfContractAllows("useContractForShow", "receiveStateHidePulse", value);
        if (isContractBased) {
            // contract name exists and attribute allows it to be based on contract, then receiveStateHidePulse becomes void
            return;
        }
        value = this._checkAndSetStringValue(value);
        if ('' === value || value === this._receiveStateHidePulse) {
            return;
        }

        this.clearBooleanSignalSubscription(this._receiveStateHidePulse, this._subKeySigReceiveHidePulse);

        this._receiveStateHidePulse = value;
        this.setAttribute('receivestatehidepulse', value);

        const recSigHidePulseName: string = Ch5Signal.getSubscriptionSignalName(this._receiveStateHidePulse);
        const recSig: Ch5Signal<boolean> | null = Ch5SignalFactory.getInstance().getBooleanSignal(recSigHidePulseName);

        if (null === recSig) {
            return;
        }

        this._subKeySigReceiveHidePulse = recSig.subscribe((newVal: boolean) => {
            this.info(' subs callback for signalReceiveHidePulse: ', this._subKeySigReceiveHidePulse, ' Signal has value ', newVal);
            if (null !== recSig) {
                if (false === recSig.prevValue && true === newVal) {
                    this.setAttribute('show', 'false');
                }
            } else {
                this.info(' subs callback for signalReceiveHidePulse: ', this._subKeySigReceiveHidePulse, ' recSig is null');
            }
        });
    }

    /**
     * overriding default receiveStateShowPulse specif getter-setter
     */
    public set receiveStateShowPulse(value: string) {
        this.info('Ch5Dpad set receiveStateShowPulse("' + value + '")');
        const isContractBased = this.checkIfContractAllows("useContractForShow", "receiveStateShowPulse", value);
        if (isContractBased) {
            // contract name exists and attribute allows it to be based on contract, then receiveStateShowPulse becomes void
            return;
        }
        value = this._checkAndSetStringValue(value);
        if ('' === value || value === this._receiveStateShowPulse) {
            return;
        }

        this.clearBooleanSignalSubscription(this._receiveStateShowPulse, this._subKeySigReceiveShowPulse);

        this._receiveStateShowPulse = value;
        this.setAttribute('receivestateshowpulse', value);

        const recSigShowPulseName: string = Ch5Signal.getSubscriptionSignalName(this._receiveStateShowPulse);
        const recSig: Ch5Signal<boolean> | null = Ch5SignalFactory.getInstance().getBooleanSignal(recSigShowPulseName);

        if (null === recSig) {
            return;
        }

        this._subKeySigReceiveShowPulse = recSig.subscribe((newVal: boolean) => {
            this.info(' subs callback for signalReceiveShowPulse: ', this._subKeySigReceiveShowPulse, ' Signal has value ', newVal);
            if (null !== recSig) {
                const _newVal = (newVal as never as { repeatdigital: boolean }).repeatdigital !== undefined ? (newVal as never as { repeatdigital: boolean }).repeatdigital : newVal;
                if ((recSig.prevValue as never as { repeatdigital: boolean }).repeatdigital !== undefined) {
                    if (false === (recSig.prevValue as never as { repeatdigital: boolean }).repeatdigital && true === _newVal) {
                        this.setAttribute('show', 'true')
                    }
                    return;
                }
                if (false === recSig.prevValue && true === _newVal) {
                    this.setAttribute('show', 'true')
                }
            }
        });
    }

    /**
     * overriding default receiveStateCustomStyle specif getter-setter
     */
    public set receiveStateCustomStyle(value: string) {
        const isContractBased = this.checkIfContractAllows("useContractForCustomStyle", "receiveStateCustomStyle", value);
        if (isContractBased) {
            // contract name exists and attribute allows it to be based on contract, then receiveStateCustomStyle becomes void
            return;
        }
        value = this._checkAndSetStringValue(value);
        if ('' === value || value === this._receiveStateCustomStyle) {
            return;
        }

        this.clearStringSignalSubscription(this._receiveStateCustomStyle, this._subKeySigReceiveCustomStyle);

        this._receiveStateCustomStyle = value;
        this.setAttribute('receivestatecustomstyle', value);

        const recSigCustomStyleName: string = Ch5Signal.getSubscriptionSignalName(this._receiveStateCustomStyle);
        const recSig: Ch5Signal<string> | null = Ch5SignalFactory.getInstance().getStringSignal(recSigCustomStyleName);

        if (null === recSig) {
            return;
        }

        let hasSignalChanged = false;
        this._subKeySigReceiveCustomStyle = recSig.subscribe((newVal: string) => {
            this.info(' subs callback for signalReceiveCustomStyle: ', this._subKeySigReceiveCustomStyle, ' Signal has value ', newVal);
            if ('' !== newVal) {
                hasSignalChanged = true;
            }
            if (newVal !== this.customStyle && hasSignalChanged) {
                this.setAttribute('customStyle', newVal);
            }
        });
    }

    /**
     * overriding default receiveStateCustomClass specif getter-setter
     */
    public set receiveStateCustomClass(value: string) {
        const isContractBased = this.checkIfContractAllows("useContractForCustomClass", "receiveStateCustomClass", value);
        if (isContractBased) {
            // contract name exists and attribute allows it to be based on contract, then receiveStateCustomClass becomes void
            return;
        }
        value = this._checkAndSetStringValue(value);
        if ('' === value || value === this._receiveStateCustomClass) {
            return;
        }

        this.clearStringSignalSubscription(this._receiveStateCustomClass, this._subKeySigReceiveCustomClass);

        this._receiveStateCustomClass = value;
        this.setAttribute('receivestatecustomclass', value);

        const recSigCustomClassName: string = Ch5Signal.getSubscriptionSignalName(this._receiveStateCustomClass);
        const recSig: Ch5Signal<string> | null = Ch5SignalFactory.getInstance().getStringSignal(recSigCustomClassName);

        if (null === recSig) {
            return;
        }
        let hasSignalChanged = false;

        this._subKeySigReceiveCustomClass = recSig.subscribe((newVal: string) => {
            this.info('subs callback for signalReceiveCustomClass: ', this._receiveStateCustomClass, ' Signal has value ', newVal);
            if ('' !== newVal) {
                hasSignalChanged = true;
            }
            if (newVal !== this.customClass && hasSignalChanged) {
                // this.setAttribute('customclass', newVal);
                this.customClass = newVal;
            }
        });
    }

    //#endregion

    //#region 3. Lifecycle Hooks

    public constructor() {
        super();
        this.logger.start('constructor()', this.COMPONENT_NAME);

        CH5DpadUtils.clearComponentContent(this);

        // set attributes based on onload attributes
        this.initAttributes();
        // add missing elements, remove extra ones, before DPAD is finally rendered
        this.checkAndRestructureDomOfDpad();

        this.logger.stop();
    }

    /**
     * 	Called every time the element is inserted into the DOM.
     *  Useful for running setup code, such as fetching resources or rendering.
     */
    public connectedCallback() {
        this.info(' connectedCallback() - start', this.COMPONENT_NAME);

        const ready = Promise.all([
            customElements.whenDefined('ch5-dpad-button-top'),
            customElements.whenDefined('ch5-dpad-button-left'),
            customElements.whenDefined('ch5-dpad-button-bottom'),
            customElements.whenDefined('ch5-dpad-button-right'),
            customElements.whenDefined('ch5-dpad-button-center')
        ]).then(() => {
            // check if all components required to build dpad are ready, instantiated and available for consumption
            this.onAllSubElementsCreated();
        });
        if (this.isComponentLoaded) {
            this.info('connectedCallback() - end', this.COMPONENT_NAME);
        }
        this.logger.stop();
    }

    /**
     * Function create and bind events for dpad once all the expected child elements are defined and
     * ready for consumption
     */
    private onAllSubElementsCreated() {
        this.info(' onAllSubElementsCreated() - start', this.COMPONENT_NAME);
        customElements.whenDefined('ch5-dpad').then(() => {
            // create element
            this.createElementsAndInitialize();

            // update class based on the current type chosen
            this.updateCssClasses();

            // events binding
            this.attachEventListeners();

            // check if the dpad element has been created by verifying one of its properties


            // initialize mutation observer if any
            this.initCommonMutationObserver(this);
            this.isComponentLoaded = true;
        });
        this.logger.stop();
    }

    /**
     * Function to create HTML elements of the components including child elements
     */
    private createElementsAndInitialize() {
        if (!this._wasInstatiated) {
            this.createHtmlElements();
        }
        this._wasInstatiated = true;
    }

    /**
     * Called every time the element is removed from the DOM.
     * Useful for running clean up code.
     */
    public disconnectedCallback() {
        this.removeEvents();
        this.unsubscribeFromSignals();

        // disconnect common mutation observer
        this.disconnectCommonMutationObserver();
    }

    private removeEvents() {
        throw new Error("Method not implemented or element is not structured correctly.");
    }

    /**
     * Unsubscribe signals
     */
    public unsubscribeFromSignals() {
        super.unsubscribeFromSignals();
    }

    static get observedAttributes() {
        const commonAttributes: string[] = Ch5Common.observedAttributes;

        // attributes
        const attributes: string[] = [
            "contractname",
            "type",
            "shape",
            "stretch",
            "sendEventOnClickStart",
            "usecontractforenable",
            "usecontractforshow"
        ];

        // received signals
        const receivedSignals: string[] = [];

        // sent signals
        const sentSignals: string[] = [];

        const ch5DpadAttributes = commonAttributes.concat(attributes).concat(receivedSignals).concat(sentSignals);

        return ch5DpadAttributes;
    }

    public attributeChangedCallback(attr: string, oldValue: string, newValue: string) {
        this.logger.start("attributeChangedCallback", this.COMPONENT_NAME);
        if (oldValue === newValue) {
            this.logger.stop();
            return;
        }

        this.info('ch5-dpad attributeChangedCallback("' + attr + '","' + oldValue + '","' + newValue + '")');
        const isValidContract: boolean = (CH5DpadUtils.getAttributeAsString(this, 'contractname', '').length > 0);

        switch (attr) {
            case 'usecontractforshow':
                this.useContractForShow = CH5DpadUtils.setAttributesBasedValue(this.hasAttribute(attr), newValue, '');
                break;
            case 'usecontractforenable':
                this.useContractforEnable = CH5DpadUtils.setAttributesBasedValue(this.hasAttribute(attr), newValue, '');
                break;
            case 'usecontractforcustomstyle':
                this.useContractForCustomStyle = CH5DpadUtils.setAttributesBasedValue(this.hasAttribute(attr), newValue, '');
                break;
            case 'usecontractforcustomclass':
                this.useContractForCustomClass = CH5DpadUtils.setAttributesBasedValue(this.hasAttribute(attr), newValue, '');
                break;
            case 'receivestateshow':
                if (!isValidContract) {
                    this.receiveStateShow = CH5DpadUtils.setAttributesBasedValue(this.hasAttribute(attr), newValue, '');
                }
                break;
            case 'receivestateenable':
                if (!isValidContract) {
                    this.receiveStateEnable = CH5DpadUtils.setAttributesBasedValue(this.hasAttribute(attr), newValue, '');
                }
                break;
            case 'receivestateshowpulse':
                if (!isValidContract) {
                    this.receiveStateShowPulse = CH5DpadUtils.setAttributesBasedValue(this.hasAttribute(attr), newValue, '');
                }
                break;
            case 'receivestatehidepulse':
                if (!isValidContract) {
                    this.receiveStateHidePulse = CH5DpadUtils.setAttributesBasedValue(this.hasAttribute(attr), newValue, '');
                }
                break;
            case 'receivestatecustomstyle':
                if (!isValidContract) {
                    this.receiveStateCustomStyle = CH5DpadUtils.setAttributesBasedValue(this.hasAttribute(attr), newValue, '');
                }
                break;
            case 'receivestatecustomclass':
                if (!isValidContract) {
                    this.receiveStateCustomClass = CH5DpadUtils.setAttributesBasedValue(this.hasAttribute(attr), newValue, '');
                }
                break;
            case 'sendeventonclickstart':
                if (!isValidContract) {
                    this.sendEventOnClickStart = CH5DpadUtils.setAttributesBasedValue(this.hasAttribute(attr), newValue, '');
                }
                break;
            default:
                super.attributeChangedCallback(attr, oldValue, newValue);
                break;
        }

        this.logger.stop();
    }

    /**
     * Function to create all the elements required under the parent DPAD tag
     */
    protected createHtmlElements(): void {
        this.logger.start('createHtmlElements', this.COMPONENT_NAME);

        this.classList.add(this.primaryCssClass);
        this.classList.add(this.shape);

        const childItems = this.children;

        if (childItems.length === 0) {
            this.createAndAppendAllButtonsUnderDpad();
        } else {
            const isValidStructure = this.checkIfOrderOfTagsAreinTheRightOrder(childItems);
            if (!isValidStructure) {
                throw new Error("ch5-dpad not constructed correctly, please refer documentation.");
            }
        }

        this.logger.stop();
    }

    /**
     * Function to add all 5 buttons in the expected order if not added in the DOM
     */
    private createAndAppendAllButtonsUnderDpad() {
        const centerBtn = new Ch5DpadCenter();
        const topBtn = new Ch5DpadTop();
        const rightBtn = new Ch5DpadRight();
        const bottomBtn = new Ch5DpadBottom();
        const leftBtn = new Ch5DpadLeft();
        // order of appending is --- center, top, left/right, right/left, bottom
        this.appendChild(centerBtn);
        this.appendChild(topBtn);

        if (this.shape === Ch5Dpad.SHAPES[0]) {
            // if the selected shape is 'plus'
            this.appendChild(leftBtn);
            this.appendChild(rightBtn);
        }
        else if (this.shape === Ch5Dpad.SHAPES[1]) {
            // if the selected shape is 'circle'
            this.appendChild(rightBtn);
            this.appendChild(leftBtn);
        } else {
            // if the selected shape is an invalid value
            throw new Error("Seems to be an invalid shape. Must be 'plus' or 'circle' as values.");
        }

        this.appendChild(bottomBtn);
    }

    /**
     * Function to check if the tags are sequenced in the right/expected order
     * @param childItems 
     * @returns true if the order is correct [order of appending is --- center, top, left/right, right/left, bottom]
     */
    private checkIfOrderOfTagsAreinTheRightOrder(childItems: HTMLCollection) {
        let ret = false;
        if (childItems.length === 5) {
            const firstTag = this.shape === Ch5Dpad.SHAPES[0] ? 'left' : 'right'; // if 'plus'
            const secondTag = this.shape === Ch5Dpad.SHAPES[0] ? 'right' : 'left'; // if 'circle'

            ret = ((childItems[0].tagName.toLowerCase() === 'ch5-dpad-button-center') &&
                (childItems[1].tagName.toLowerCase() === 'ch5-dpad-button-top') &&
                (childItems[2].tagName.toLowerCase() === 'ch5-dpad-button-' + firstTag) &&
                (childItems[3].tagName.toLowerCase() === 'ch5-dpad-button-' + secondTag) &&
                (childItems[4].tagName.toLowerCase() === 'ch5-dpad-button-bottom'));
        } else {
            // removing child tags and emptying DPAD if the tag count is neither 0 or 5
            if (childItems.length > 0) {
                for (const item of Array.from(childItems)) {
                    item.remove();
                }
            }
        }
        return ret;
    }

    /**
     *  Called to initialize all attributes
     */
    protected initAttributes(): void {
        this.logger.start("initAttributes", this.COMPONENT_NAME);
        super.initAttributes();
        // set data-ch5-id
        this.setAttribute('data-ch5-id', this.getCrId());

        CH5DpadUtils.setAttributeToElement(this, 'role', Ch5RoleAttributeMapping.ch5Dpad); // WAI-ARIA Attributes
        this.contractName = CH5DpadUtils.setAttributeToElement(this, 'contractName'.toLowerCase(), this._contractName);
        this.type = CH5DpadUtils.setAttributeToElement(this, 'type', this._type) as TCh5DpadType;
        this.shape = CH5DpadUtils.setAttributeToElement(this, 'shape', this._shape) as TCh5DpadShape;
        this.stretch = CH5DpadUtils.setAttributeToElement(this, 'stretch', this._stretch) as TCh5DpadStretch;

        // DEV NOTE: if contract name exists, and the individual attribute values don't exist, 
        // then the default value is true for useContractFor*
        // else useContractFor* picks value from attributes
        const isContractNameAvailable = Boolean(this.contractName).toString();
        this.useContractforEnable = CH5DpadUtils.getBoolFromString(
            CH5DpadUtils.setAttributeToElement(this, 'useContractforEnable'.toLowerCase(), isContractNameAvailable));
        this.useContractForShow = CH5DpadUtils.getBoolFromString(
            CH5DpadUtils.setAttributeToElement(this, 'useContractForShow'.toLowerCase(), isContractNameAvailable));
        this.useContractForCustomStyle = CH5DpadUtils.getBoolFromString(
            CH5DpadUtils.setAttributeToElement(this, 'useContractForCustomStyle'.toLowerCase(), isContractNameAvailable));
        this.useContractForCustomStyle = CH5DpadUtils.getBoolFromString(
            CH5DpadUtils.setAttributeToElement(this, 'useContractForCustomClass'.toLowerCase(), isContractNameAvailable));

        this.logger.stop();
    }

    /**
     * Called to bind proper listeners
     */
    protected attachEventListeners() {
        super.attachEventListeners();
    }

    protected updateCssClasses(): void {
        // apply css classes for attrs inherited from common (e.g. customClass, customStyle )
        super.updateCssClasses();
    }

    //#endregion

    //#region 4. Other Methods

    /**
     * Function to restructure initial DOM before rendering commences
     */
    private checkAndRestructureDomOfDpad() {
        this.logger.start('checkAndRestructureDomOfDpad()', this.COMPONENT_NAME);
        if (this.children.length === 0) {
            // nothing to do, all buttons will be appended as required
            return;
        } else {
            this.removeDuplicateChildElements();
        }

        this.logger.stop();
    }

    private removeDuplicateChildElements() {
        const childItems: Element[] = Array.from(this.children);
        // DEV NOTE: DONT CHANGE THE SEQUENCE OF ENTRIES IN THIS ARRAY
        const childElementArray: string[] = ["ch5-dpad-button-center",
            "ch5-dpad-button-top",
            "ch5-dpad-button-left",
            "ch5-dpad-button-right",
            "ch5-dpad-button-bottom"];

        const refobj: any = {}; // stores the reference of all buttons relevant for dpad

        // // FIRST: remove all duplciate entries under DPAD
        if (childItems.length > 0) {
            for (const item of childItems) {
                const tagName = item.tagName.toLowerCase();
                if (!refobj.hasOwnProperty(tagName) && childElementArray.indexOf(tagName) > -1) {
                    refobj[tagName] = item;
                } else {
                    item.remove(); // removing, as this is a duplicate node
                }
            }
            // remove all child elements, since it will be created again in the right/expected order
            for (const item of childItems) {
                item.remove();
            }
        }

        // // SECOND: create and add all non existing child tags 
        if (refobj !== null) {
            for (const tagName of childElementArray) {
                if (!refobj.hasOwnProperty(tagName)) {
                    const ele = document.createElement(tagName);
                    refobj[tagName] = ele as HTMLElement;
                }
            }
        }
        // // THIRD: Finally, add the elements in the right order
        if (this.shape === Ch5Dpad.SHAPES[0] && this !== null) {
            // if the selected shape is 'plus'
            // ORDER: center, top, left, right, bottom
            this.appendChild(refobj[childElementArray[0]]);
            this.appendChild(refobj[childElementArray[1]]);
            this.appendChild(refobj[childElementArray[2]]); // first, left element
            this.appendChild(refobj[childElementArray[3]]); // then, the right element
            this.appendChild(refobj[childElementArray[4]]);
        } else if (this.shape === Ch5Dpad.SHAPES[1] && this !== null) {
            // if the selected shape is 'circle'
            // ORDER: center, top, right, left, bottom
            this.appendChild(refobj[childElementArray[0]]);
            this.appendChild(refobj[childElementArray[1]]);
            this.appendChild(refobj[childElementArray[3]]); // first, right element
            this.appendChild(refobj[childElementArray[2]]); // then, the left element
            this.appendChild(refobj[childElementArray[4]]);
        }
    }

    private checkIfContractAllows(attrToCheck: string, attrToSet: string, value: string | boolean): boolean {
        attrToCheck = attrToCheck.toLowerCase();
        attrToSet = attrToSet.toLowerCase();
        this.info('Ch5Dpad set ' + attrToCheck + '("' + value + '")');
        const contractName = CH5DpadUtils.getAttributeAsString(this, 'contractname', '');
        const isContractBased = CH5DpadUtils.getAttributeAsBool(this, attrToSet, this.checkIfValueIsTruey(contractName));

        return isContractBased;
    }

    //#endregion

    //#region 5. Events
    //#endregion

}

if (typeof window === "object"
    && typeof window.customElements === "object"
    && typeof window.customElements.define === "function") {

    window.customElements.define('ch5-dpad', Ch5Dpad);
}