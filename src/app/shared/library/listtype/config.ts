export const defaultOptions = {
  controlPosition: 'left',
      append: false,
      actionButtons: [],
      controlOrder: [
        'text',
        'select',
        'checkbox',
        'checkbox-group',
        'radio-group',
        'textarea',
        'header'
      ],
      dataType: 'json',
      // Array of fields to disable
      disableFields: [
        'number',
        'date',
        'autocomplete',
        'button',
        'paragraph',
        'file',
        'radio-group',
        'header',
        'hidden'
      ],
      disabledAttrs: [],
      disabledActionButtons: [],
      editOnAdd: false,
      defaultFields: [{
                "type": "text",
                "key": "code",
                "label": "Mã đối tượng",
                "required": true,
                "placeholder": "Nhập vào mã đối tượng danh mục",
                "className": "form-control"
            },
            {
                "type": "text",
                "key": "name",
                "label": "Tên đối tượng",
                "required": true,
                "placeholder": "Nhập vào tên đối tượng danh mục",
                "className": "form-control"
            },
            {
                "type": "textarea",
                "key": "note",
                "label": "Ghi chú",
                "className": "form-control",
                "subtype": "textarea",
                "rows": "2"
            },
            {
                "type": "text",
                "key": "order",
                "label": "Số thứ tự",
                "className": "form-control"
            },
            {
                "type": "checkbox-group",
                "key": "status",
                "label": "Trạng thái",
                "values": [
                    {
                        "label": "Hoạt động",
                        "value": "true",
                        "selected": true
                    }
                ]
            }],
      fields: [],
      fieldRemoveWarn: false,
      inputSets: [],
      roles: {
        1: 'Administrator'
      },
      notify: {
        error: message => console.error(message),
        success: message => console.log(message),
        warning: message => console.warn(message)
      },
      onSave: (evt, formData) => null,
      onClearAll: () => null,
      prepend: false,
      sortableControls: false,
      stickyControls: {
        enable: true,
        offset: {
          top: 5,
          bottom: 'auto',
          right: 'auto'
        }
      },
      templates: {},
      showActionButtons: false,
      typeUserDisabledAttrs: {},
      typeUserAttrs: {},
      typeUserEvents: {},
      prefix: 'form-builder-'
    };


export const styles = {
  btn: [
    'default',
    'danger',
    'info',
    'primary',
    'success',
    'warning'
  ]
};

export const defaultI18n = {
      langs: [
        'en-US'
      ],
      preloaded: {
        'en-US': {
          addOption: 'Thêm thuộc tính',
          allFieldsRemoved: 'Tất cả đối tượng xe bị xóa.',
          allowMultipleFiles: 'Allow users to upload multiple files',
          autocomplete: 'Autocomplete',
          button: 'Button',
          listtype: 'Chọn danh mục',
          cannotBeEmpty: 'This field cannot be empty',
          checkboxGroup: 'Checkbox Group',
          checkbox: 'Checkbox',
          checkboxes: 'Checkboxes',
          className: 'Tên Class',
          clearAllMessage: 'Bạn có chắc chắn xóa tất cả các trường?',
          clear: 'Xóa',
          close: 'Đóng',
          content: 'Nội dung',
          copy: 'Copy To Clipboard',
          copyButton: '&#43;',
          copyButtonTooltip: 'Copy',
          dateField: 'Date Field',
          description: 'Mô tả',
          descriptionField: 'Description',
          devMode: 'Developer Mode',
          editNames: 'Edit Names',
          editorTitle: 'Form Elements',
          editXML: 'Edit XML',
          enableOther: 'Enable &quot;Other&quot;',
          enableOtherMsg: 'Let users to enter an unlisted option',
          fieldNonEditable: 'This field cannot be edited.',
          fieldRemoveWarning: 'Are you sure you want to remove this field?',
          fileUpload: 'File Upload',
          formUpdated: 'Form Updated',
          getStarted: 'Kéo thả đối tượng vào đây',
          header: 'Header',
          hide: 'thuộc tính',
          hidden: 'Hidden Input',
          inline: 'Inline',
          inlineDesc: 'Display {type} inline',
          label: 'Tiêu đề',
          labelEmpty: 'Tiêu đề không được để trống',
          limitRole: 'Limit access to one or more of the following roles:',
          mandatory: 'Mandatory',
          maxlength: 'Độ dài tối đa',
          minOptionMessage: 'This field requires a minimum of 2 options',
          minSelectionRequired: 'Minimum {min} selections required',
          multipleFiles: 'Multiple Files',
          name: 'Name',
          key: 'Mã định danh',
          no: 'No',
          noFieldsToClear: 'There are no fields to clear',
          number: 'Number',
          off: 'Off',
          on: 'On',
          option: '',
          options: 'Dữ liệu hiển thị',
          optional: '',
          optionLabelPlaceholder: 'Tiêu đề',
          optionValuePlaceholder: 'Value',
          optionEmpty: '',
          other: 'Other',
          paragraph: 'Paragraph',
          placeholder: 'Mô tả',
          'placeholder.value': 'Nhập giá trị',
          'placeholder.label': 'Nhập tiêu đề',
          'placeholder.text': '',
          'placeholder.textarea': '',
          'placeholder.email': 'Enter you email',
          'placeholder.placeholder': '',
          'placeholder.className': '',
          'placeholder.password': 'Enter your password',
          preview: 'Xem',
          radioGroup: 'Radio Group',
          radio: 'Radio',
          removeMessage: 'Xóa đối tượng',
          removeOption: 'Xóa tùy chọn',
          remove: '&#215;',
          required: 'Bắt buộc nhập',
          richText: 'Rich Text Editor',
          roles: 'Access',
          rows: 'Rows',
          save: 'Lưu lại',
          selectOptions: 'Dữ liệu hiển thị',
          select: 'Select',
          selectColor: 'Select Color',
          selectionsMessage: 'Allow Multiple Selections',
          size: 'Size',
          'size.xs': 'Extra Small',
          'size.sm': 'Small',
          'size.m': 'Default',
          'size.lg': 'Large',
          style: 'Style',
          'styles.btn.default': 'Default',
          'styles.btn.danger': 'Danger',
          'styles.btn.info': 'Info',
          'styles.btn.primary': 'Primary',
          'styles.btn.success': 'Success',
          'styles.btn.warning': 'Warning',
          subtype: 'Kiểu',
          text: 'Text Field',
          textArea: 'Text Area',
          savejson: 'Json data',
          toggle: 'Toggle',
          warning: 'Warning!',
          value: 'Giá trị',
          viewJSON: '{  }',
          viewXML: '&lt;/&gt;',
          yes: 'Yes'
        }
      }
    };

export const config = {};
