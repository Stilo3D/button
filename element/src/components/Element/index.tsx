import { useMemo } from "react";
import { Alert, Tabs } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/useCustomReduxHook";
//import { useTheme } from "../../hooks/useTheme";
import {
  addError,
  getErrors,
  removeError,
} from "../../store/slices/helperSlice";
import { ParameterData } from "../../types/interfaces";

interface Layout {
  rowStart: number;
  rowEnd: number;
  colStart: string;
  colEnd: number;
  element: string;
  id: number;
}

interface Layouts {
  layout_1?: Layout[];
  layout_2?: Layout[];
  layout_3?: Layout[];
  layout_4?: Layout[];
  layout_5?: Layout[];
}

const Element = () => {
  const dispatch = useAppDispatch();
  //const { theme } = useTheme();
  const errors = useAppSelector((state) => getErrors(state));
  const params = useAppSelector((state) => state.messageData.parameters);

  // Get an object with just the layouts
  const layouts = useMemo(() => {
    const obj: Layouts = {};

    const parseLayout = (
      paramKey: keyof ParameterData,
      layoutKey: keyof Layouts
    ) => {
      if (paramKey in params) {
        try {
          const paramValue = params[paramKey] as string | undefined;
          // TODO check the object structure is correct.
          if (paramValue) {
            obj[layoutKey] = JSON.parse(paramValue);
          }
        } catch (error) {
          const err = error as SyntaxError;
          dispatch(
            addError({
              name: `${layoutKey} JSON Parse Error`,
              message: err.message,
            })
          );
          obj[layoutKey] = [];
        }
      }
    };

    parseLayout("layout_1", "layout_1");
    parseLayout("layout_2", "layout_2");
    parseLayout("layout_3", "layout_3");
    parseLayout("layout_4", "layout_4");
    parseLayout("layout_5", "layout_5");

    return obj;
  }, [params]);

  const colors = useMemo(() => {
    return [
      "orangered",
      "green",
      "blueviolet",
      "pink",
      "royalblue",
      "goldenrod",
    ];
  }, []);

  return (
    <>
      {Object.keys(layouts).length === 1 && layouts.layout_1 ? (
        <div
          className="w-full grid grid-cols-6 gap-2 font-serif font-bold uppercase text-white text-2xl"
          style={{ gridAutoRows: "minmax(150px, 1fr)" }}
        >
          {layouts.layout_1.map((element, index) => (
            <div
              className="flex justify-center"
              style={{
                gridRow: `${element.rowStart}/${element.rowEnd}`,
                gridColumn: `${element.colStart}/${element.colEnd}`,
                backgroundColor: colors[index],
              }}
            >
              <div className="flex items-center">{element.element}</div>
            </div>
          ))}
        </div>
      ) : (
        <Tabs
          defaultActiveKey="1"
          type="card"
          size="small"
          items={Object.keys(layouts).map((key, index) => {
            const id = String(index + 1);
            const layoutKey = key as keyof Layouts; // Type assertion here

            return {
              label: key,
              key: id,
              children: (
                <>
                  <div
                    className="w-full grid grid-cols-6 gap-2 font-serif font-bold uppercase text-white text-2xl"
                    style={{ gridAutoRows: "minmax(150px, 1fr)" }}
                  >
                    {(layouts[layoutKey] || []).map((element, index) => (
                      <div
                        className="flex justify-center"
                        style={{
                          gridRow: `${element.rowStart}/${element.rowEnd}`,
                          gridColumn: `${element.colStart}/${element.colEnd}`,
                          backgroundColor: colors[index],
                        }}
                      >
                        <div className="flex items-center">
                          {element.element}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ),
            };
          })}
        />
      )}
      {!!errors.length && (
        <Alert
          className="w-full text-center"
          type="error"
          showIcon
          closable
          onClose={() => dispatch(removeError(errors[0]?.name))}
          message={`${errors[0]?.name}:  ${errors[0]?.message}`}
        />
      )}
    </>
  );
};

export default Element;
