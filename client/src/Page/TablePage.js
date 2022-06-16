import React, { Children, useEffect, useState } from 'react'
import { Button, message, Upload, Space, Table, Tag, Popconfirm, Modal, Input } from 'antd';
import axios from 'axios';

export default function TablePage() {

    const [defaultList, setdefaultList] = useState()
    const [list, setList] = useState()
    const [searchValue, setSearchValue] = useState({
        hoVaTen: '',
        maHocSinh: ''
    })

    const [visible, setVisible] = useState({
        user: {},
        flag: false,
        isLoading: false
    });

    useEffect(() => {
        axios.get('/api/getStudentList')
            .then(res => {
                setList(res.data.data)
                setdefaultList(res.data.data)
            })
            .catch(err => console.log(err.response.data))
    }, [])

    const handleOk = () => {
        setVisible({ ...visible, isLoading: true });
        axios.post('/api/updateUser', visible.user)
            .then(res => {
                let newList = defaultList.map(user => user.maHocSinh === visible.user.maHocSinh ? visible.user : user)
                setdefaultList(newList)
                setList(newList)
                setVisible({
                    user: {},
                    flag: false,
                    isLoading: false
                });
                message.success("Cập nhật thành công!")
            })
            .catch(err => {
                setVisible({
                    user: {},
                    flag: false,
                    isLoading: false
                });
                message.error("Opps!? Something went wrong!")
            })
    };

    const handleModalChange = (e) => {
        const { value, name } = e.target
        setVisible({
            user: { ...visible.user, [name]: value },
            flag: true
        })
    }

    const handleSearchChange = (e) => {
        const { value, name } = e.target
        setSearchValue({ ...searchValue, [name]: value })
    }

    const handleSearch = () => {
        const { hoVaTen, maHocSinh } = searchValue
        let MHStemp = maHocSinh.trim().replace(" ", "")
        let HVTtemp = removeAccents(hoVaTen).toLowerCase().trim()
        let HVTsearchList = []
        let MHSseacrhList = []

        if (maHocSinh !== '') {
            for (let student of defaultList) {
                let str = student['maHocSinh'].replace(/\r?\n/g, "")
                if (str.includes(MHStemp)) {
                    MHSseacrhList.push(student)
                }
            }
            setList(MHSseacrhList)
        } else if (hoVaTen !== '') {
            for (let student of defaultList) {
                let str = removeAccents(student['hoVaTen']).toLowerCase()
                if (str.search(HVTtemp) !== -1) {
                    HVTsearchList.push(student)
                }
            }
            setList(HVTsearchList)
        } else {
            setList(defaultList)
        }
    }

    const removeAccents = (str) => {
        return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D');
    }

    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            render: (text, record, index) => {
                return <span>{index + 1}</span>
            }
        },
        {
            title: 'Trường tiểu học',
            dataIndex: 'truongTieuHoc',
            key: 'truongTieuHoc',
        },
        {
            title: 'Quận/Huyện',
            dataIndex: 'quanHuyen',
            key: 'quanHuyen',
        },
        {
            title: 'Mã học sinh',
            dataIndex: 'maHocSinh',
            key: 'maHocSinh',
        },
        {
            title: 'Lớp',
            dataIndex: 'lop',
            key: 'lop',
        },
        {
            title: 'Họ và tên',
            dataIndex: 'hoVaTen',
            key: 'hoVaTen',
        },

        {
            title: 'Ngày sinh',
            children: [
                {
                    title: 'Ngày ',
                    dataIndex: 'ngay',
                    key: 'ngay',
                },
                {
                    title: 'Tháng ',
                    dataIndex: 'thang',
                    key: 'thang',
                },
                {
                    title: 'Năm ',
                    dataIndex: 'nam',
                    key: 'nam',
                },
            ]
        },
        {
            title: 'Giới tính',
            dataIndex: 'gioiTinh',
            key: 'gioiTinh',
        },
        {
            title: 'Nơi sinh',
            dataIndex: 'noiSinh',
            key: 'noiSinh',
        },
        {
            title: 'Dân tộc',
            dataIndex: 'danToc',
            key: 'danToc',
        },
        {
            title: 'Hộ khẩu thường trú ',
            dataIndex: 'hoKhau',
            key: 'hoKhau',
        },
        {
            title: 'Điện thoại liên hệ ',
            dataIndex: 'dienThoai',
            key: 'dienThoai',
        },
        {
            title: 'Điểm sơ tuyển vòng 1',
            children: [
                {
                    title: 'Tổng điểm năm lớp 1',
                    dataIndex: 'diem1',
                    key: 'diem1',
                    width: '5%'
                },
                {
                    title: 'Tổng điểm năm lớp 2',
                    dataIndex: 'diem2',
                    key: 'diem2',
                    width: '5%'

                },
                {
                    title: 'Tổng điểm năm lớp 3',
                    dataIndex: 'diem3',
                    key: 'diem3',
                    width: '5%'

                },
                {
                    title: 'Tổng điểm năm lớp 4',
                    dataIndex: 'diem4',
                    key: 'diem4',
                    width: '5%'

                },
                {
                    title: 'Tổng điểm năm lớp 5',
                    dataIndex: 'diem5',
                    key: 'diem5',
                    width: '5%'

                },
                {
                    title: 'Tổng điểm kết quả 5 năm',
                    dataIndex: 'tongDiem',
                    key: 'tongDiem',
                    width: '6%'

                },
                {
                    title: 'Điểm ưu tiên',
                    dataIndex: 'diemUuTien',
                    key: 'diemUuTien',
                    width: '4%'

                },
                {
                    title: 'Tổng điểm sơ tuyển',
                    dataIndex: 'tongDiemSoTuyen',
                    key: 'tongDiemSoTuyen',
                    width: '5%',
                    render: (_, record) => {
                        let color = record.tongDiemSoTuyen > 200 ? 'green' : 'volcano'
                        return <>
                            <Tag color={color}>
                                {record.tongDiemSoTuyen}
                            </Tag>
                        </>
                    },
                },
            ]
        },
        {
            title: 'Ghi chú',
            dataIndex: 'ghiChu',
            key: 'ghiChu',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {
                return <Space size="middle">
                    <Popconfirm
                        title={`Xác nhận xóa ${record.hoVaTen} khỏi danh sách ?`}
                        onConfirm={() => {
                            const { maHocSinh } = record
                            axios.post('/api/deleteUser', { maHocSinh: maHocSinh })
                                .then(res => {
                                    message.success(`Đã xóa thành công học sinh ${record.hoVaTen} khỏi danh sách!`);
                                    let newList = defaultList.filter(student => student.maHocSinh !== maHocSinh)
                                    setList(newList)
                                    setdefaultList(newList)

                                    // axios.get('/api/getStudentList')
                                    //     .then(res => {
                                    //         setList(res.data.data)
                                    //         setdefaultList(res.data.data)
                                    //     })
                                    //     .catch(err => console.log(err.response.data))
                                })
                                .catch(err => {
                                    message.error(`Oops! Something went wrong. Please try again!`);
                                    console.log(err.response.data)
                                })
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <button style={{ border: 'none' }} href="#" className='text-danger btn'>Delete</button>
                    </Popconfirm>
                    <button className='text-primary btn' style={{ border: 'none' }} onClick={() => {
                        setVisible({
                            user: record,
                            flag: true,
                            isLoading: false
                        })
                    }}>Edit</button>
                </Space>
            },
        },
    ];

    return (
        <div >
            <div className='mb-5 w-50 mx-auto'>
                <div className='row'>
                    <div className='col-2'>
                        <label style={{ whiteSpace: 'nowrap', margin: "0 40px 0 0", fontSize: '20px' }}>Họ tên</label>
                    </div>
                    <div className='col-10'>
                        <input onChange={handleSearchChange} name='hoVaTen' placeholder='Nhập họ tên' className='form-control' />
                    </div>
                </div>
                <div className='row mt-4'>
                    <div className='col-2'>
                        <label style={{ whiteSpace: 'nowrap', margin: "0 40px 0 0", fontSize: '20px' }}>Mã học sinh</label>
                    </div>
                    <div className='col-10'>
                        <input onChange={handleSearchChange} name='maHocSinh' placeholder='Nhập mã học sinh' className='form-control' />
                    </div>
                </div>
                <div className='d-flex justify-content-center mt-3'>
                    <button className='btn btn-success px-4' onClick={() => handleSearch()}>Tìm kiếm</button>
                    <button className='btn btn-primary ml-3' onClick={() => {
                        setList(defaultList)
                    }}>Clear table</button>
                </div>
            </div>
            <Table
                className='mx-5'
                columns={columns}
                rowKey={"stt"}
                dataSource={list}
                size="small" bordered
                scroll={{ x: '200vw' }} />
            <Modal
                title={`Chỉnh sửa thông tin học sinh ${visible.user.hoVaTen}`}
                visible={visible.flag}
                onOk={handleOk}
                confirmLoading={visible.isLoading}
                onCancel={() => {
                    setVisible({
                        user: {},
                        flag: false,
                        isLoading: false
                    })
                }}
            >
                <div className='mb-3'>
                    <label>Mã học sinh: </label>
                    <Input name='maHocSinh' disabled value={visible.user.maHocSinh} onChange={handleModalChange} />
                </div>
                <div className='mb-3'>
                    <label>Trường tiểu học: </label>
                    <Input name='truongTieuHoc' value={visible.user.truongTieuHoc} onChange={handleModalChange} />
                </div>
                <div className='mb-3'>
                    <label>Quận/Huyện: </label>
                    <Input name='quanHuyen' value={visible.user.quanHuyen} onChange={handleModalChange} />
                </div>
                <div className='mb-3'>
                    <label>Lớp: </label>
                    <Input name='lop' value={visible.user.lop} onChange={handleModalChange} />
                </div>
                <div className='mb-3 d-flex'>
                    <div className='mr-3'>
                        <label>Ngày sinh: </label>
                        <Input name='ngay' value={visible.user.ngay} onChange={handleModalChange} />
                    </div>
                    <div className='mr-3'>
                        <label>Tháng sinh: </label>
                        <Input name='thang' value={visible.user.thang} onChange={handleModalChange} />
                    </div>
                    <div>
                        <label>Năm sinh: </label>
                        <Input name='nam' value={visible.user.nam} onChange={handleModalChange} />
                    </div>
                </div>
                <div className='mb-3'>
                    <label>Dân tộc: </label>
                    <Input name='danToc' value={visible.user.danToc} onChange={handleModalChange} />
                </div>
                <div className='mb-3'>
                    <label>Hộ khẩu thường trú: </label>
                    <Input name='hoKhau' value={visible.user.hoKhau} onChange={handleModalChange} />
                </div>
                <div className='mb-3'>
                    <label>Điện thoại liên hệ: </label>
                    <Input name='dienThoai' value={visible.user.dienThoai} onChange={handleModalChange} />
                </div>
            </Modal>
        </div>
    )
}
