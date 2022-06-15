import React, { Children, useEffect, useState } from 'react'
import { Button, message, Upload, Space, Table, Tag, Popconfirm } from 'antd';
import axios from 'axios';

export default function TablePage() {

    const [defaultList, setdefaultList] = useState()
    const [list, setList] = useState()
    const [searchValue, setSearchValue] = useState({
        hoVaTen: '',
        maHocSinh: ''
    })

    useEffect(() => {
        axios.get('/api/getStudentList')
            .then(res => {
                setList(res.data.data)
                setdefaultList(res.data.data)
            })
            .catch(err => console.log(err.response.data))
    }, [])

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
                        title="Are you sure to delete this user?"
                        onConfirm={() => {
                            const { maHocSinh } = record
                            axios.post('/api/deleteUser', { maHocSinh: maHocSinh })
                                .then(res => {
                                    message.success(`Đã xóa thành công học sinh ${record.hoVaTen} khỏi danh sách!`);
                                    axios.get('/api/getStudentList')
                                        .then(res => {
                                            setList(res.data.data)
                                            setdefaultList(res.data.data)
                                        })
                                        .catch(err => console.log(err.response.data))
                                })
                                .catch(err => console.log(err.response.data))
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <a href="#" className='text-danger'>Delete</a>
                    </Popconfirm>
                </Space>
            },
        },
    ];

    const handleChange = (e) => {
        const { value, name } = e.target
        setSearchValue({ ...searchValue, [name]: value })
    }

    const handleSearch = () => {
        const { hoVaTen, maHocSinh } = searchValue
        let MHStemp = maHocSinh.trim().replace(" ", "")
        let HVTtemp = removeAccents(hoVaTen).toLowerCase()
        let HVTsearchList = []
        let MHSseacrhList = []

        if (maHocSinh !== '') {
            for (let student of list) {
                let str = student['maHocSinh'].replace(/\r?\n/g, "")
                if (str.includes(MHStemp)) {
                    MHSseacrhList.push(student)
                }
            }
            setList(MHSseacrhList)
        } else if (hoVaTen !== '') {
            for (let student of list) {
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

    return (
        <div >
            <div className='mb-5 w-50 mx-auto'>
                <div className='row'>
                    <div className='col-2'>
                        <label style={{ whiteSpace: 'nowrap', margin: "0 40px 0 0", fontSize: '20px' }}>Họ tên</label>
                    </div>
                    <div className='col-10'>
                        <input onChange={handleChange} name='hoVaTen' placeholder='Nhập họ tên' className='form-control' />
                    </div>
                </div>
                <div className='row mt-4'>
                    <div className='col-2'>
                        <label style={{ whiteSpace: 'nowrap', margin: "0 40px 0 0", fontSize: '20px' }}>Mã học sinh</label>
                    </div>
                    <div className='col-10'>
                        <input onChange={handleChange} name='maHocSinh' placeholder='Nhập mã học sinh' className='form-control' />
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

        </div>
    )
}
