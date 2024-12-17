import React, { useEffect, useState } from 'react';
import './Main.css';
import axios from 'axios';
import { GrFormSearch } from "react-icons/gr";

function Main() {
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [searchRegionQuery, setSearchRegionQuery] = useState('');
  const [searchPlateQuery, setSearchPlateQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const regions = {
    수도권: [
      { key: 'seoul', label: '서울특별시', 
        subRegions: [{ key: 'gangnam', label: '강남구' }, { key: 'gangdong', label: '강동구' }, { key: 'gangbuk', label: '강북구' }, { key: 'gangseo', label: '강서구' }, { key: 'gwanak', label: '관악구' },
                     { key: 'gwangjin', label: '광진구' }, { key: 'guro', label: '구로구' }, { key: 'geumcheon', label: '금천구' }, { key: 'nowon', label: '노원구' }, { key: 'dobong', label: '도봉구' },
                     { key: 'dongdaemun', label: '동대문구' }, { key: 'dongjak', label: '동작구' }, { key: 'mapo', label: '마포구' }, { key: 'seodaemun', label: '서대문구' }, { key: 'seocho', label: '서초구' },
                     { key: 'seongdong', label: '성동구' }, { key: 'seongbuk', label: '성북구' }, { key: 'songpa', label: '송파구' }, { key: 'yangcheon', label: '양천구' }, { key: 'yeongdeungpo', label: '영등포구' },
                     { key: 'yongsan', label: '용산구' }, { key: 'eunpyeong', label: '은평구' }, { key: 'jongno', label: '종로구' }, { key: 'jung', label: '중구' }, { key: 'jungnang', label: '중랑구' }
                    ] 
      },
      { key: 'incheon', label: '인천광역시', subRegions: [{ key: 'bupyeong', label: '부평구' }] },
      { key: 'gyeonggi', label: '경기도' },
    ],
    강원권: [{ key: 'gangwon', label: '강원도' }],
    충청권: [{ key: 'daejeon', label: '대전광역시' }, { key: 'sejong', label: '세종특별자치시' }, { key: 'chungbuk', label: '충청북도' }, { key: 'chungnam', label: '충청남도' }],
    전라권: [{ key: 'gwangju', label: '광주광역시' }, { key: 'jeonbuk', label: '전라북도' }, { key: 'jeonnam', label: '전라남도' }],
    경상권: [{ key: 'busan', label: '부산광역시' }, { key: 'daegu', label: '대구광역시' }, { key: 'ulsan', label: '울산광역시' }, { key: 'gyeongbuk', label: '경상북도' }, { key: 'gyeongnam', label: '경상남도' }],
    제주권: [{ key: 'jeju', label: '제주특별자치도' }],
  };

  const allowedRegions = ['seodaemun'];
  const [selectedRegion, setSelectedRegion] = useState('Seodaemun');

  useEffect(() => {
    // 데이터 불러오기
    axios.get('http://15.165.10.33:8080/api/data')
      .then((res) => {
        // report_bool이 true인 데이터만 필터링
        const filteredDataWithCheckboxes = res.data
          .filter(item => item.reportBool === true) // report_bool이 true인 데이터만 필터링
          .map(item => ({
            ...item,
            isChecked: false, // 각 데이터에 체크박스 상태 추가
          }));

        setData(filteredDataWithCheckboxes);
        setFilteredData(filteredDataWithCheckboxes);
        setSelectedRegion('seodaemun');
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const toggleExpand = (region) => {
    setExpanded(prev => {
      const newExpanded = { ...prev };
  
      // 제일 큰 단위 지역 목록 (수도권, 강원권, 충청권, 전라권, 경상권, 제주권)
      const largeRegions = ['수도권', '강원권', '충청권', '전라권', '경상권', '제주권'];
  
      // 만약 제일 큰 단위 지역을 열 때 다른 제일 큰 단위 지역을 닫는 로직
      if (largeRegions.includes(region)) {
        // 기존에 열려있는 다른 큰 단위 지역들을 모두 닫기
        largeRegions.forEach(largeRegion => {
          if (largeRegion !== region && newExpanded[largeRegion]) {
            newExpanded[largeRegion] = false; // 다른 큰 단위 지역 닫기
          }
        });
  
        // 선택된 제일 큰 단위 지역을 열기
        if (newExpanded[region]) {
          newExpanded[region] = false;
        } else {
          newExpanded[region] = true; // 선택된 지역을 여는 동작
        }
  
        // 하위 지역들을 닫기
        if (regions[region]) {
          regions[region].forEach(subRegion => {
            newExpanded[subRegion.key] = false;
            if (subRegion.subRegions) {
              subRegion.subRegions.forEach(subSubRegion => {
                newExpanded[subSubRegion.key] = false;
              });
            }
          });
        }
      } else {
        // 제일 큰 단위 지역이 아닌 경우에는 해당 지역만 토글
        newExpanded[region] = !newExpanded[region];
      }
  
      return newExpanded;
    });
  };
  
  const handleRegionClick = (region) => {
    if (allowedRegions.includes(region)) {
      setErrorMessage(null);
      setSelectedItem(null);
      setFilteredData(data);
      setSelectedRegion(region);
    } else if (!allowedRegions.includes(region)) {
      setErrorMessage((
        <>
          <span style={{ fontSize: '14px' }}>데이터 조회 권한이 없습니다.</span> <br />
          <span style={{ fontSize: '13px' }}>올바른 지역을 선택해 주세요.</span>
        </>
      ));  
      setFilteredData([]);
      setSelectedRegion(region);
    } else {
      toggleExpand(region);
    }
  };

  const handleRegionSearch = () => {
    let foundRegion = false;

    for (const [regionGroup, subRegions] of Object.entries(regions)) {
      if (regionGroup === searchRegionQuery) {
        foundRegion = true;
        setErrorMessage((
          <>
            <span style={{ fontSize: '14px' }}>잘못된 입력입니다.</span> <br />
            <span style={{ fontSize: '13px' }}>입력하신 지역이 최하위 지역인지 다시 한 번 확인해 주세요.</span>
          </>
        ));  
        setFilteredData([]);
        setSelectedRegion(null);
        return;
      }

      for (const region of subRegions) {
        if (region.label === searchRegionQuery) {
          foundRegion = true;
          if (!allowedRegions.includes(region.key)) {
            setErrorMessage((
              <>
                <span style={{ fontSize: '14px' }}>잘못된 입력입니다.</span> <br />
                <span style={{ fontSize: '13px' }}>입력하신 지역이 최하위 지역인지 다시 한 번 확인해 주세요.</span>
              </>
            ));           
            setFilteredData([]);
            setSelectedRegion(null);
            return;
          } else {
            setErrorMessage(null);
            setSelectedItem(null);
            setFilteredData(data);
            setSelectedRegion(region.key);
            return;
          }
        }

        if (region.subRegions) {
          for (const subRegion of region.subRegions) {
            if (subRegion.label === searchRegionQuery) {
              foundRegion = true;
              if (!allowedRegions.includes(subRegion.key)) {
                setErrorMessage((
                  <>
                    <span style={{ fontSize: '14px' }}>데이터 조회 권한이 없습니다.</span> <br />
                    <span style={{ fontSize: '13px' }}>올바른 지역을 검색해 주세요.</span>
                  </>
                ));  
                setFilteredData([]);
                setSelectedRegion(subRegion.key);
                return;
              } else {
                setErrorMessage(null);
                setSelectedItem(null);
                setFilteredData(data);
                setSelectedRegion(subRegion.key);
                return;
              }
            }
          }
        }
      }
    }

    if (!foundRegion) {
      setErrorMessage((
        <>
          <span style={{ fontSize: '14px' }}>잘못된 입력입니다.</span> <br />
          <span style={{ fontSize: '13px' }}>입력하신 지역의 철자가 정확한지 다시 한 번 확인해 주세요.</span>
        </>
      ));  
      setFilteredData([]);
      setSelectedRegion(null);
    }
  };

  const handlePlateSearch = () => {
    setErrorMessage('');
    const filteredByDate = filterDataByDate(data);
    const filteredByPlate = filteredByDate.filter(item =>
      !searchPlateQuery || item.plateString.includes(searchPlateQuery)
    );
  
    // 검색 후 결과가 없을 경우 selectedItem을 null로 설정
    if (filteredByPlate.length === 0) {
      setSelectedItem(null);
      setFilteredData([]);
    }
  
    else setFilteredData(filteredByPlate);
  };

  const filterDataByDate = (data) => {
    setErrorMessage('');
    
    if (!startDate && !endDate) {
      return data;
    }
  
    const startDateObj = startDate ? new Date(startDate).setHours(0, 0, 0, 0) : null;
    const endDateObj = endDate ? new Date(endDate).setHours(23, 59, 59, 999) : null;
  
    return data.filter(({ firstCaptureTime, lastCaptureTime }) => {
      const firstDate = new Date(firstCaptureTime);
      const lastDate = new Date(lastCaptureTime);
  
      return (!startDateObj || firstDate >= startDateObj) &&
             (!endDateObj || lastDate <= endDateObj);
    });
  };
    
  const toggleCheckbox = (index) => {
    const selected = filteredData[index];
  
    setFilteredData(prevData =>
      prevData.map((item, idx) => ({
        ...item,
        isChecked: idx === index ? !item.isChecked : false
      }))
    );
  
    // 선택된 항목이 체크된 경우 setSelectedItem에 데이터 설정
    setSelectedItem(selected.isChecked ? null : selected);
  };  

  return (
    <div className="main">
      <header className="header">
        <img src="/resources/logo1.png" alt="Logo 1" className="logo1" />
        <img src="/resources/logo2.png" alt="Logo 2" className="logo2" />
        <div className="welcome">환영합니다</div>
        <div className="account">서대문구 관리자 01</div>
        <img src="/resources/account.png" alt="Account" className="account_img" />
      </header>
  
      <main className="main-content">
        <aside className="sidebar">
          <h4>행정 및 지역 구분</h4>
          <div className="searchRegion-bar">
            <div className="searchRegion-input">
              <input
                type="text"
                placeholder="지역명 검색"
                value={searchRegionQuery}
                onChange={(e) => setSearchRegionQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleRegionSearch();
                  }
                }}
              />
              <span className="search-icon" onClick={handleRegionSearch}>
                <GrFormSearch />
              </span>
            </div>
          </div>
          <div className="sidebar-section">
            <ul>
              {Object.entries(regions).map(([regionKey, subRegions]) => (
                <li key={regionKey}>
                  <span onClick={() => toggleExpand(regionKey)}>
                    {regionKey} {expanded[regionKey] ? '▼' : ''}
                  </span>
                  {expanded[regionKey] && (
                    <ul>
                      {subRegions.map(({ key, label, subRegions }) => (
                        <li key={key}>
                          <span onClick={() => toggleExpand(key)}>
                            {label} {expanded[key] ? '▼' : ''}
                          </span>
                          {expanded[key] && subRegions && (
                            <ul>
                              {subRegions.map(({ key, label }) => (
                                <li 
                                  key={key} 
                                  onClick={() => handleRegionClick(key)}
                                  style={{
                                    width: '120%',
                                    marginLeft: '-30%',
                                    textAlign: 'left',
                                    color: selectedRegion === key ? 'white' : 'black',
                                    background: selectedRegion === key ? 'linear-gradient(25deg, #8E37D7, #6B8DD6, #2CD8D5)' : 'transparent',
                                    padding: '5px 0px 5px 50px',
                                    borderRadius: '8px',
                                  }}
                                >
                                  {label}
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </aside>
  
        <div className="vertical-line1"></div>
  
        <section className="content">
          <div 
            className="dashboard"
            style={{
              height: errorMessage ? '100%' : '55%', // 더 많은 공간을 할당
            }}
          >
            <div className="dashboard-title">대시보드</div>
  
            <div className="searchPlate-bar">
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
              style={{ position: 'relative', zIndex: 1 }} />
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}
              style={{ position: 'relative', zIndex: 1 }} />

              {/* 차량번호 검색창 */}
              <div className="searchPlate-input-wrapper">
                <span className="search-icon2">
                  <GrFormSearch /> {/* 여기 아이콘을 원하는 아이콘으로 변경 */}
                </span>
                <input  
                  type="text"
                  placeholder="차량번호 검색"
                  value={searchPlateQuery}
                  onChange={(e) => setSearchPlateQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handlePlateSearch();
                    }
                  }}
                />
              </div>

              <button onClick={handlePlateSearch}>검색</button>
            </div>

            <div className="update-date">최신 업데이트: 2024-11-25</div>
  
            <hr className="separator" />
  
            <div className="data-table">
              {errorMessage ? (
                <div className="image-wrapper3">
                  <img src="/resources/loading.png" alt="Loading" className="loading" />
                  <div>{errorMessage}</div>
                </div>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      {['report_id', 'plate_string', 'first_capture_time', 'last_capture_time', 'latitude', 'longitude', 'first_image_url', 'last_image_url', 'first_device_id', 'last_device_id', 'first_cropped_url', 'last_cropped_url'].map((header) => (
                        <th key={header}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.length > 0 ? (
                      filteredData.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <input
                              type="checkbox"
                              checked={item.isChecked || false}
                              onChange={() => toggleCheckbox(index)}
                            />
                          </td>
                          {Object.values(item).map((value, idx) => (
                            <td key={idx}>{value}</td>
                          ))}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="13" className="no-data-message">
                          <div>데이터가 없습니다.</div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
  
          {!errorMessage && (
            <div className="detail">
              <div className="detail-title">상세정보</div>
              {selectedItem ? (
                <div className="detail-content">
                  <div className="detail-table-wrapper">
                    <table className="detail-table">
                      <tbody>
                        <tr>
                          <td>차량번호</td>
                          <td>{selectedItem.plateString}</td>
                        </tr>
                        <tr>
                          <td>위도</td>
                          <td>{selectedItem.latitude}</td>
                        </tr>
                        <tr>
                          <td>경도</td>
                          <td>{selectedItem.longitude}</td>
                        </tr>
                        <tr>
                          <td>최초 발견 시각</td>
                          <td>{selectedItem.firstCaptureTime}</td>
                        </tr>
                        <tr>
                          <td>마지막 발견 시각</td>
                          <td>{selectedItem.lastCaptureTime}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
    
                  <div className="vertical-line2"></div>
    
                  <div className="image-wrapper">
                    <div className="image-item">
                      <div className="image-label">적발 차량 최초 발견 사진</div>
                      <img
                        src={`https://capstone-processed-image-bucket.s3.amazonaws.com/${selectedItem.firstCroppedUrl?.replace('s3://capstone-processed-image-bucket/', '')}`}
                        alt="First Cropped"
                        className="cropped-image"
                      />
                    </div>
    
                    <div className="image-item">
                      <div className="image-label">적발 차량 마지막 발견 사진</div>
                      <img
                        src={`https://capstone-processed-image-bucket.s3.amazonaws.com/${selectedItem.secondCroppedUrl?.replace('s3://capstone-processed-image-bucket/', '')}`}
                        alt="Last Cropped"
                        className="cropped-image"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="image-wrapper2">
                  <img src="/resources/loading.png" alt="Loading" className="loading" />
                  <div><span style={{ fontSize: '14px' }}>체크박스를 선택하여 해당 레코드에 대한 이미지 데이터를 조회할 수 있습니다.</span></div>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );  
}

export default Main;
