import React from 'react';
import { create } from 'react-test-renderer';
import ProfileStatus from './ProfileStatus';


describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
      const component = create(<ProfileStatus status="check me" />);
      // получить экземпляр объекта, с которым взаимодействуем
      const instance = component.getInstance();
      expect(instance.state.status).toBe("check me");
    });

    test("after creation <span> should be displayed", () => {
        const component = create(<ProfileStatus status="check me" />);
        const root = component.root;
        let span = root.findByType("span");
        expect(span).not.toBeNull();
      });

    test("after creation <input> shouldn't be displayed", () => {
    const component = create(<ProfileStatus status="check me" />);
    const root = component.root;
    expect(() => {
        let input = root.findByType("input");
    }).toThrow();
    });
    // .toThrow();
    // .not.toBeNull();

  // У нас в компоненте должен быть span
  // И не должно быть input
    test("after creation <span> should contain correct status", () => {
      const component = create(<ProfileStatus status="check me" />);
      const root = component.root;
      let span = root.findByType("span");
      expect(span.children[0]).toBe("check me");
    });

    test("input should be displayes in editMode instead of span", () => {
        const component = create(<ProfileStatus status="check me" />);
        const root = component.root;
        // Нашли span
        let span = root.findByType("span");
        // Дважды кликнули по этому span. Он исщез...
        span.props.onDoubleClick();
        // ... и мы нашли input
        let input = root.findByType("input");
        // и в этом input мы нашли "check me"
        expect(input.props.value).toBe("check me");
      });
     
    test("callback should be called", () => {
        // Эта функция умеет считать сколько раз ее вызывали
        const mockCallBack = jest.fn();
        const component = create(<ProfileStatus status="check me" updateStatus={mockCallBack} />);
        const instance = component.getInstance();
        instance.deactivateEditMode() 
        expect(mockCallBack.mock.calls.length).toBe(1);
        });  
  });