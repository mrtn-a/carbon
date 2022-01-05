import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";
import { formatToISO } from "../date/__internal__/utils";
import DateInput from "../date";
import { filterStyledSystemMarginProps } from "../../style/utils";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import StyledDateRange from "./date-range.style";
import Events from "../../__internal__/utils/helpers/events";
import useLocale from "../../hooks/__internal__/useLocale";
import { localeMap } from "../date/__internal__/locale-map/locale-map";
import DateRangeContext from "./date-range.context";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const DateRange = ({
  endDateProps = {},
  id,
  labelsInline,
  name,
  onBlur,
  onChange,
  startDateProps = {},
  tooltipPosition,
  validationOnLabel,
  value,
  ...rest
}) => {
  const l = useLocale();
  const { format } = localeMap[l.locale()];
  const inlineLabelWidth = 40;
  const [lastChangedDate, setLastChangedDate] = useState("");

  const getStartDate = useCallback(() => {
    const { value: startValue } = startDateProps;

    return startValue || value[0];
  }, [startDateProps, value]);

  const getEndDate = useCallback(() => {
    const { value: endValue } = endDateProps;

    return endValue || value[1];
  }, [endDateProps, value]);

  const [inputRefMap, setInputRefMap] = useState({
    start: {
      isBlurBlocked: { current: false },
      setOpen: null,
    },
    end: {
      isBlurBlocked: { current: false },
      setOpen: null,
    },
  });

  const [startDateValue, setStartDateValue] = useState({
    formattedValue: getStartDate(),
    rawValue: formatToISO(format, getStartDate()),
  });

  const [endDateValue, setEndDateValue] = useState({
    formattedValue: getEndDate(),
    rawValue: formatToISO(format, getEndDate()),
  });

  const updateValues = useCallback(() => {
    setStartDateValue({
      formattedValue: getStartDate(),
      rawValue: formatToISO(format, getStartDate()),
    });

    setEndDateValue({
      formattedValue: getEndDate(),
      rawValue: formatToISO(format, getEndDate()),
    });
  }, [getEndDate, getStartDate, format]);

  function usePrevious(arg) {
    const ref = useRef();
    useEffect(() => {
      ref.current = arg;
    });
    return ref.current;
  }

  const previousValue = usePrevious(value);

  useEffect(() => {
    const hasPreviousValues = previousValue?.length;
    const hasUpdated =
      hasPreviousValues &&
      (value[0] !== previousValue[0] || value[1] !== previousValue[1]);

    if (hasUpdated) {
      updateValues();
    }
  }, [value, previousValue, updateValues]);

  const buildCustomEvent = useCallback(
    (changedDate, newValue) => {
      const startValue =
        changedDate === "startDate" && newValue ? newValue : startDateValue;
      const endValue =
        changedDate === "endDate" && newValue ? newValue : endDateValue;

      setLastChangedDate(changedDate);

      return {
        target: {
          ...(name && { name }),
          ...(id && { id }),
          value: [startValue, endValue],
        },
      };
    },
    [endDateValue, id, name, startDateValue]
  );

  const handleOnChange = (changedDate, ev) => {
    if (changedDate === "startDate") {
      setStartDateValue({ ...ev.target.value });
    } else {
      setEndDateValue({ ...ev.target.value });
    }

    const event = buildCustomEvent(changedDate, ev.target.value);
    onChange(event);
  };

  const startDateOnChange = (ev) => {
    handleOnChange("startDate", ev);
  };

  const endDateOnChange = (ev) => {
    handleOnChange("endDate", ev);
  };

  const updateInputMap = (newState) => {
    setInputRefMap((prev) => {
      return {
        ...prev,
        ...newState,
      };
    });
  };

  const isBlurBlocked = () =>
    inputRefMap.start.isBlurBlocked.current ||
    inputRefMap.end.isBlurBlocked.current;

  const handleOnBlur = (ev) => {
    if (isBlurBlocked()) {
      return;
    }

    if (onBlur) {
      const event = buildCustomEvent(lastChangedDate, ev.target.value);
      onBlur(event);
    }
  };

  const closePicker = (activeInput) => {
    inputRefMap[activeInput].setOpen(false);
    inputRefMap[activeInput].isBlurBlocked.current = false;
  };

  const handleOnKeyDown = (ev, activeInput) => {
    if (Events.isTabKey(ev) && Events.isShiftKey(ev)) {
      if (activeInput === "start") {
        inputRefMap.start.isBlurBlocked.current = false;
      } else {
        inputRefMap.start.isBlurBlocked.current = true;
      }
    } else if (Events.isTabKey(ev)) {
      if (activeInput === "end") {
        inputRefMap.end.isBlurBlocked.current = false;
      } else {
        inputRefMap.end.isBlurBlocked.current = true;
      }
    }
  };

  const dateProps = (propsKey) => {
    const props = propsKey === "start" ? startDateProps : endDateProps;

    const { formattedValue: inputValue } =
      propsKey === "start" ? startDateValue : endDateValue;
    const onChangeCallback =
      propsKey === "start" ? startDateOnChange : endDateOnChange;

    return {
      label: rest[`${propsKey}Label`],
      labelInline: labelsInline,
      value: inputValue,
      error: rest[`${propsKey}Error`],
      warning: rest[`${propsKey}Warning`],
      info: rest[`${propsKey}Info`],
      validationOnLabel,
      onBlur: handleOnBlur,
      onChange: onChangeCallback,
      onKeyDown: (ev) => handleOnKeyDown(ev, propsKey),
      ...props,
    };
  };

  return (
    <StyledDateRange
      {...tagComponent("date-range", rest)}
      labelsInline={labelsInline}
      {...filterStyledSystemMarginProps(rest)}
    >
      <DateRangeContext.Provider
        value={{ inputRefMap, setInputRefMap: updateInputMap }}
      >
        <DateInput
          {...dateProps("start")}
          onFocus={() => closePicker("end")}
          data-element="start-date"
          labelWidth={inlineLabelWidth} // Textbox only applies this when labelsInLine prop is true
          tooltipPosition={tooltipPosition}
        />
        <DateInput
          {...dateProps("end")}
          onFocus={() => closePicker("start")}
          data-element="end-date"
          labelWidth={inlineLabelWidth} // Textbox only applies this when labelsInLine prop is true
          tooltipPosition={tooltipPosition}
        />
      </DateRangeContext.Provider>
    </StyledDateRange>
  );
};

DateRange.propTypes = {
  /** Filtered styled system margin props */
  ...marginPropTypes,
  /**
   * Optional label for endDate field
   */
  endLabel: PropTypes.string,
  /** Custom callback - receives array of startDate and endDate */
  onChange: PropTypes.func.isRequired,
  /** Custom callback - receives array of startDate and endDate */
  onBlur: PropTypes.func,
  /** An array containing the value of startDate and endDate */
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** Indicate that error has occurred on start date
  Pass string to display icon, tooltip and red border
  Pass true boolean to only display red border */
  startError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Indicate that warning has occurred on start date
  Pass string to display icon, tooltip and orange border
  Pass true boolean to only display orange border */
  startWarning: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Indicate additional information for start date
  Pass string to display icon, tooltip and blue border
  Pass true boolean to only display blue border */
  startInfo: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Indicate that error has occurred on end date
  Pass string to display icon, tooltip and red border
  Pass true boolean to only display red border */
  endError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Indicate that warning has occurred on end date
  Pass string to display icon, tooltip and orange border
  Pass true boolean to only display orange border */
  endWarning: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Indicate additional information for end date
  Pass string to display icon, tooltip and blue border
  Pass true boolean to only display blue border */
  endInfo: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** When true, validation icons will be placed on labels instead of being placed on the inputs */
  validationOnLabel: PropTypes.bool,
  /**
   * Optional label for startDate field
   */
  startLabel: PropTypes.string,
  /** Display labels inline */
  labelsInline: PropTypes.bool,
  /** Props for the child start Date component */
  startDateProps: PropTypes.shape({
    ...DateInput.propTypes,
    onChange: PropTypes.func,
    value: PropTypes.string,
  }),
  /** Props for the child end Date component */
  endDateProps: PropTypes.shape({
    ...DateInput.propTypes,
    onChange: PropTypes.func,
    value: PropTypes.string,
  }),
  /** An optional string prop to provide a name to the component */
  name: PropTypes.string,
  /** An optional string prop to provide an id to the component */
  id: PropTypes.string,
  /** Overrides the default tooltip position */
  tooltipPosition: PropTypes.oneOf(["top", "bottom", "left", "right"]),
};

export default DateRange;
